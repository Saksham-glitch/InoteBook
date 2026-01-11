import React, { useState } from 'react';
import NoteContext from './noteContext';

const notesInitial = [];
const NoteState = (props) => {
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      console.log('Fetched notes:', json);
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error('Fetched notes is not an array:', json);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add note
  const addNote = async (title, description, tag) => {

    try {
      const response = await fetch('http://localhost:5000/api/notes/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log('Added note:', json);
      setNotes([...notes, json]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
   
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      console.log('Deleted note:', json);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    const token = localStorage.getItem('token');
  

    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log('Edited note:', json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;