# Pink Random Text Generator

A Chrome extension that generates realistic random English text using Markov chains. Perfect for testing, design mockups, or placeholder content.

## Features

- 🎲 **Markov Chain Text Generation** - Creates natural-sounding English text based on a source corpus
- 📋 **Auto-copy to Clipboard** - Optionally copies generated text automatically
- ⚙️ **Customizable Length** - Choose between 100, 200, or 500 character minimums
- 💾 **Persistent Settings** - Remembers your preferences using Chrome storage
- 🎨 **Modern UI** - Clean, dark-themed interface with Tailwind CSS

## GitHub repository

https://github.com/kimmosaarinen/pink-random-text-generator

## Installation

### For Development

1. Clone this repository:
   ```bash
   git clone https://github.com/kimmosaarinen/pink-random-text-generator.git
   cd pink-random-text-generator
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked" and select the extension directory

### From Chrome Web Store

*Coming soon!*

## Usage

1. Click the extension icon in your Chrome toolbar
2. Select your desired minimum character length (100, 200, or 500)
3. Check "Automatically copy..." if you want the text copied to clipboard
4. Click "Regenerate" to create new random text
5. The generated text appears below and is automatically copied if enabled

## How It Works

This extension uses **Markov chain text generation**:

1. **Tokenization** - Breaks down a source text (`english.txt`) into tokens (words, punctuation, spaces)
2. **Transition Matrix** - Builds a probability model of which words follow which sequences
3. **Generation** - Creates new text by randomly following probable word sequences
4. **Sentence Filtering** - Ensures output starts with a capital letter and contains complete sentences

The algorithm uses a configurable sample size (currently 6 tokens) to balance between:
- **Smaller values** = More random, less coherent
- **Larger values** = More coherent, closer to source text

## Project Structure

```
chrome-extension/
├── manifest.json         # Extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # Main application logic
├── english.txt           # Source text corpus
├── tailwind.js           # Tailwind CSS
├── generator/
│   ├── generator.js      # Markov chain text generator
│   └── tokenizer.js      # Text tokenization utilities
├── icons/                # Extension icons
└── package.json          # Project metadata and scripts
```

## Technical Details

- Permissions: `storage` (for saving user preferences)

## Scripts

```bash
# Create a production ZIP file
yarn zip
```

## Credits

The Markov chain text generation algorithm is based on concepts described in:
- [Text Generation with Markov Chains](https://dev.to/bespoyasov/text-generation-with-markov-chains-in-javascript-i38)

## License

ISC