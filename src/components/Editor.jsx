import { useState, useContext, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { ThemeContext } from "../context/ThemeContext";

const Editor = ({ currentNote, updateNote }) => {
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState(currentNote.body);

  useEffect(() => {
    setText(currentNote.body);
  }, [currentNote]);

  function handleChange(e) {
    setText(e.target.value);
    updateNote(e.target.value);
  }

  return (
    <div className={`editor ${theme}`}>
      <textarea value={text} onChange={handleChange} />
      <div className={`preview ${theme}`}>
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
};

export default Editor;
