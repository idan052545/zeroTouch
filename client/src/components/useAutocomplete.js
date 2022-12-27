import { useState, useRef, useEffect } from "react";
import Trie from "../Trie";

const useAutocomplete = (commands) => {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const trie = useRef(new Trie());

  useEffect(() => {
    // commands.forEach((command) =>
    //   command.split(" ").forEach((split) => trie.current.insert(split))
    // );
    commands.forEach((command) => trie.current.insert(command));
  }, [commands]);

  useEffect(() => {
    const inputElement = inputRef.current;
    setSuggestion(suggestions[currentSuggestionIndex]);

    function handleInput(event) {
      setValue(event.target.value);
      const newSuggestions = trie.current.suggest(event.target.value);
      setSuggestions(newSuggestions);
      console.log(newSuggestions);
      setCurrentSuggestionIndex(0);
      // setSuggestion(suggestions[currentSuggestionIndex]);
    }

    function handleKeyDown(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        // setValue(suggestion);
        if (suggestions.length > 0) {
          setValue(suggestions[currentSuggestionIndex]);
          setSuggestion(suggestions[currentSuggestionIndex]);
        }
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();

        if (event.key === "ArrowUp") {
          if (currentSuggestionIndex > 0) {
            setCurrentSuggestionIndex(currentSuggestionIndex - 1);
          }
        } else if (event.key === "ArrowDown") {
          if (currentSuggestionIndex < suggestions.length - 1) {
            setCurrentSuggestionIndex(currentSuggestionIndex + 1);
          }
        }
        // setSuggestion(newSuggestion);
      }
    }

    inputElement.addEventListener("input", handleInput);
    inputElement.addEventListener("keydown", handleKeyDown);

    return () => {
      inputElement.removeEventListener("input", handleInput);
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [value, currentSuggestionIndex, suggestions]);

  return { value, suggestion, inputRef, setValue };
};

export default useAutocomplete;
