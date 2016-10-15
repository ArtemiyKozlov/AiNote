import {NoteDto} from "../../shared/dtos/note";
import {NoteModel} from "../models/noteModel";

export interface NoteRepository {
    save(noteDto: NoteDto, callback: (err: any, res?: string) => void);
    getAll(callback: (err: any, res?: NoteDto) => void);
    get(id: string, callback: (err: any, res?: NoteDto) => void);
    update(noteDto: NoteDto, callback: (err: any) => void);
    remove(id: string, callback: (err: any, res?: NoteDto) => void);
}

export class MongoNoteRepository implements  NoteRepository{
    getAll(callback: (err: any, res?: NoteDto) => void) {
        NoteModel.find({}, function (err, notes) {
            if (err) return callback(err);
            let notesDto = notes.map(function(note) {
                return new NoteDto(note.id, note.header, note.body);
            });
            return callback(null, notesDto);
        })
    }

    get(id: string, callback: (err: any, res?: NoteDto) => void) {
        NoteModel.findById(id, function (err, note) {
            if (err) return callback(err);
            return callback(null, new NoteDto(note.id, note.header, note.body));
        })
    }

    update(noteDto: NoteDto, callback: (err: any) => void) {
        NoteModel.findById(noteDto.id, function (err, note){
            if(err) return callback(err);
            note.body = noteDto.body;
            note.header = noteDto.header;
            note.save(function (err) {
                if(err) return callback(err);
            });
        });
    }

    remove(id: string, callback: (err: any, res?: NoteDto) => void) {
        NoteModel.findByIdAndRemove(id, function (err) {
            if(err) return callback(err);
        })
    }

    save(noteDto: NoteDto, callback: (err: any, res?: string) => void) {
        let note = new NoteModel({ header: noteDto.header, body: noteDto.body });
        note.save(function (err, note) {
            if (err) return callback(err, null);
            return callback(err, note.id);
        });
    }
}
