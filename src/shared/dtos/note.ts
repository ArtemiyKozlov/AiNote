export class NoteDto {
    id: string;
    header: string;
    body: string;

    constructor(id: string, header: string, body: string) {
        this.id = id;
        this.header = header;
        this.body = body;
    }
}