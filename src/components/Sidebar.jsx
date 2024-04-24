const Sidebar = ({
  notes,
  setCurrentNoteId,
  currentNote,
  newNote,
  deleteNote,
}) => {
  return (
    <aside>
      <button onClick={newNote}>New Note</button>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => setCurrentNoteId(note.id)}
            className={currentNote.id === note.id ? "active" : ""}
          >
            {note.body.split("\n")[0]} {/* Show first line as preview */}
            <button onClick={(event) => deleteNote(event, note.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
