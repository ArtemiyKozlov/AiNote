import mongoose = require("mongoose");
import NoteDto = require("../../shared/dtos/note");

let noteSchema = new mongoose.Schema({
    header: String,
    body: String
});

export interface INoteModel extends mongoose.Document {
    header: string;
    body: string;
}

const mongoDocumentName = "Note";
export let NoteModel = mongoose.model<INoteModel>(mongoDocumentName, noteSchema);
