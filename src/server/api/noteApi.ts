import * as express from "express";
import {NoteRepository, MongoNoteRepository} from "../repositories/noteRepository";
import {NoteDto} from "../../shared/dtos/note";

let noteRepository: NoteRepository;
noteRepository = new MongoNoteRepository();

export let noteApi = express.Router();

noteApi.get('/', function(req, res) {
    noteRepository.getAll(function(err, note) {
        if(err) {/*TODO: handle error*/}
        res.json(500, note);
    });
});

noteApi.get('/:id', function(req, res) {
    let noteId = req.params.id;
    noteRepository.get(noteId, function(err, note) {
        if(err) {/*TODO: handle error*/}
        res.json(500, note);
    });
});

noteApi.post('/', function(req, res) {
    let noteDto = req.body as NoteDto;
    noteRepository.save(noteDto, function(err, id) {
        if(err) {/*TODO: handle error*/}
        res.json(500, id);
    });
});

noteApi.put('/', function(req, res) {
    let noteDto = req.body as NoteDto;
    noteRepository.update(noteDto, function(err) {
        if(err) {/*TODO: handle error*/}
        res.send(500);
    });
});

noteApi.delete('/:id', function(req, res) {
    let noteId = req.params.id;
    noteRepository.update(noteId, function(err) {
        if(err) {/*TODO: handle error*/}
        res.send(500);
    });
});
