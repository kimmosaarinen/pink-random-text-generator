const generateNewText = () => {
  fetch("data/english.txt")
    .then((res) => res.text())
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
        setTimeout(async () => {
          // getting sometimes "document not focused" error, so let's do a small wait before copyint to clipboard
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
  const data = await chrome.storage.local.get(["autocopy", "words"]);
  if (data) {
    const autocopy = data.autocopy ?? false;
    const words = data.words ?? 200;

    document.getElementById("autocopy").checked = autocopy;
    const radioToCheck = document.querySelector(`input[name="words"][value="${words}"]`);
    if (radioToCheck) radioToCheck.checked = true;
  }

  document.getElementById("autocopy").addEventListener("click", async () => {
    const autocopy = document.getElementById("autocopy").checked;
    await chrome.storage.local.set({ autocopy });
  });

  document.getElementById("w1").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 100 });
    generateNewText();
  });

  document.getElementById("w2").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 200 });
    generateNewText();
  });

  document.getElementById("w3").addEventListener("click", async () => {
    await chrome.storage.local.set({ words: 500 });
    generateNewText();
  });

  document.getElementById("btn").addEventListener("click", () => {
    generateNewText();
  });
  generateNewText();
});

