import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully","success")
    };

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    <small id="titleHelp" className="form-text text-muted">Title must have 2 character</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    <small id="descriptionHelp" className="form-text text-muted">Description must have 5 character</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
            </form>
        </div>
    );
};

export default Addnote;