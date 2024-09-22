import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Note from './components/NoteComponent';
import Notification from './components/Notification';
import noteService from './services/NoteService';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState()


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      });
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      });

  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  }

  const hanleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }


  return (
    <div>
      <Header app="Notes" />
      {errorMessage && <Notification message={errorMessage} />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    <form onSubmit={addNote}>
    <input value={newNote} onChange={hanleNoteChange} />
    <button type="submit">save</button>
    
    </form>
    <Footer app="Note app" school="fullstackopen.com & Open University of Helsinki" year="2024" />
    </div>
  )
}

export default App;
