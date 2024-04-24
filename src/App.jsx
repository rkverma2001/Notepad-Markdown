import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = { id: nanoid(), body: "# Enter title here\n\n" };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === currentNoteId ? { ...note, body: text } : note
      )
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
    if (noteId === currentNoteId) {
      setCurrentNoteId(notes[0].id || "");
    }
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || {};
  }

  return (
    <ThemeProvider>
      <div className="App">
        {notes.length > 0 ? (
          <Split sizes={[15, 85]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              setCurrentNoteId={setCurrentNoteId}
              currentNote={findCurrentNote()}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          </Split>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
