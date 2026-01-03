const generateNewText = (language) => {
  fetch(`data/${language}.txt`)
    .then(async (res) => {
      const text = await res.text();
      return text.replace(/\s+/g, " ");
    })
    .then(async (source) => {
      var material =
        generate({
          source,
          wordsCount: 500,
          sampleSize: 6,
        }).trim() + " ";

      // if text not starting with capital, skip to the next sentence.
      const startsWithCapital = material.match(/^[A-Z]/);
      if (!startsWithCapital) {
        const firstIndex = material.search(/[\.!?] /);
        material =
          firstIndex !== -1 ? material.slice(firstIndex + 2) + " " : "";
      }

      let output = "";
      const minLength = parseInt(document.querySelector('input[name="words"]:checked').value, 10);
      while (output.length < minLength) {
        const nextIndex = material.search(/[\.!?] /);
        if (nextIndex === -1) break;
        output = output + material.slice(0, nextIndex + 1) + " ";
        material = material.substring(nextIndex + 2);
      }
      output = output.trim();

      document.getElementById("output").innerText = output;
      const autoCopy = document.getElementById("autocopy").checked;
      if (autoCopy) {
        document.getElementById("output").focus();
        setTimeout(async () => {
          // getting sometimes "document not focused" error, so let's do a small wait before copying to clipboard
          await navigator.clipboard.writeText(output);
        }, 100);
      }
    })
    .catch((e) => {
      console.error(e);
      document.getElementById("output").value = e.message || e.toString();
    });
};

function printDebug(s) {
  document.getElementById("dummy").value += "\n" + s;
}

document.addEventListener("DOMContentLoaded", async (event) => {
  const data = await chrome.storage.local.get(["autocopy", "words", "language"]) ?? {};
  const autocopy = data.autocopy ?? false;
  const words = data.words ?? 200;
  let language = data.language ?? "en";

  document.getElementById("autocopy").checked = autocopy;

  const wordsToCheck = document.querySelector(`input[name="words"][value="${words}"]`);
  if (wordsToCheck) wordsToCheck.checked = true;

  const langToCheck = document.querySelector(`input[name="language"][value="${language}"]`);
  if (langToCheck) langToCheck.checked = true;

  document.getElementById("language-en").addEventListener("click", async () => {
    language = "en";
    await chrome.storage.local.set({ language });
    generateNewText(language);
  });

  document.getElementById("language-fi").addEventListener("click", async () => {
    language = "fi";
    await chrome.storage.local.set({ language });
    generateNewText(language);
  });

  document.getElementById("autocopy").addEventListener("click", async () => {
    const autocopy = document.getElementById("autocopy").checked;
    await chrome.storage.local.set({ autocopy });
  });

  document.getElementById("words-a").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 100 });
    generateNewText(language);
  });

  document.getElementById("words-b").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 200 });
    generateNewText(language);
  });

  document.getElementById("words-c").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 500 });
    generateNewText(language);
  });

  document.getElementById("btn").addEventListener("click", () => {
    generateNewText(language);
  });
  generateNewText(language);
});

