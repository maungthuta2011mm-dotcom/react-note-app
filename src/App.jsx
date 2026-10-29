import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text,
    };

    setNotes([newNote, ...notes]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="add-box">
        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      {filteredNotes.map((note) => (
        <div className="note" key={note.id}>
          <p>{note.text}</p>

          <button onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}