import Note = require("../models/noteModel");
import {NoteDto} from "../../shared/dtos/note";

export interface NoteRepository {
    save(noteDto: NoteDto, callback: (err: any, res?: Note) => void);
    getAll(callback: (err: any, res?: Note) => void);
    get(id: string, callback: (err: any, res?: Note) => void);
    update(noteDto: NoteDto, callback: (err: any, res?: Note) => void);
    remove(id: string, callback: (err: any, res?: Note) => void);
}

export class MongoNoteRepository implements  NoteRepository{
    getAll(callback: (err: any, res?: NoteDto) => void) {
        Note.find({}, function (err, notes) {
            if (err) return callback(err);
            let notesDto = notes.map(function(note) {
                return new NoteDto(note.id, note.header, note.body);
            });
            return callback(null, notesDto);
        })
    }

    get(id: string, callback: (err: any, res?: NoteDto) => void) {
        Note.findById(id, function (err, note) {
            if (err) return callback(err);
            return callback(null, new NoteDto(note.id, note.header, note.body));
        })
    }

    update(noteDto: NoteDto, callback: (err: any, res?: NoteDto) => void) {
        Note.findById(noteDto.id, function (err, note){
            if(err) return callback(err);
            note.body = noteDto.body;
            note.header = noteDto.header;
            note.save(function (err, note) {
                if(err) return callback(err);
            });
        });
    }

    remove(id: string, callback: (err: any, res?: NoteDto) => void) {
        Note.findByIdAndRemove(id, function (err) {
            if(err) return callback(err);
        })
    }

    save(noteDto: NoteDto, callback: (err: any, res?: NoteDto) => void) {
        let note = new Note({ header: noteDto.header, body: noteDto.body });
        note.save(function (err, note) {
            if (err) return callback(err, null);
            return callback(err, new NoteDto(note.id, note.header, note.body));
        });
    }
}
