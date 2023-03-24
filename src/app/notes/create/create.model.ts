import { Note } from "@/models";

export type CreateNoteForm = Pick<Note, "body" | "title">;
