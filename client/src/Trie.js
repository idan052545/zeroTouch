class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!node.children[letter]) {
        node.children[letter] = new TrieNode(letter);
      }
      node = node.children[letter];
    }

    node.end = true;
  }

  suggest(prefix) {
    let current = this.root;
    const suggestions = [];

    // Use a Set to store the commands that have already been checked

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!current.children[char]) {
        return suggestions;
      }
      current = current.children[char];
    }
    const checkedCommands = new Set();

    this.findWords(current, suggestions, prefix, checkedCommands);
    return suggestions;
  }

  findWords(node, words, currentWord, checkedCommands) {
    if (node.end) {
      words.push(currentWord);
    }

    // Add the current command to the checkedCommands Set
    checkedCommands.add(currentWord);

    for (const child in node.children) {
      const nextWord = currentWord + child;
      // Only continue the search if the next word has not already been checked
      if (!checkedCommands.has(nextWord)) {
        this.findWords(node.children[child], words, nextWord, checkedCommands);
      }
    }
  }
}

//   suggest(prefix) {
//     let current = this.root;
//     const suggestions = [];

//     for (let i = 0; i < prefix.length; i++) {
//       const char = prefix[i];
//       if (!current.children[char]) {
//         return suggestions;
//       }
//       current = current.children[char];
//     }

//     // add all words that contain the prefix to the suggestions array
//     this.findWordsContainingPrefix(current, suggestions, prefix);
//     return suggestions;
//   }

//   findWordsContainingPrefix(node, words, currentWord) {
//     if (node.end) {
//       words.push(currentWord);
//     }

//     for (const child in node.children) {
//       this.findWordsContainingPrefix(
//         node.children[child],
//         words,
//         currentWord + child
//       );
//     }
//   }

export default Trie;
