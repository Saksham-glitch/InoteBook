const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/login');
const Notes = require('../model/Notes.model');

// get all notes of user using get request /api/notes/fetchallnotes
Router.get('/fetchallnotes',fetchuser,async (req,res) => {
    try {
        const note = await Notes.find({user:req.user.id})
        res.json(note)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some internal error occured")
    }
})

// add a new note using post request /api/notes/addnote
Router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:1}),
    body('description','Description must be atleast 5 characters').isLength({min:1})
],async (req,res) => {
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        const note = new Notes({
            title,description,tag,user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some internal error occured")
    }
})

// update a note using put request /api/notes/updatenote/:id
Router.put('/updatenote/:id',fetchuser,async (req,res) => {
    try {
        const {title,description,tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not allowed")}

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some internal error occured")
    }
})

// delete a note using delete request /api/notes/deletenote/:id
Router.delete('/deletenote/:id',fetchuser,async (req,res) => {
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not allowed")}

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some internal error occured")
    }
})
module.exports = Router;



