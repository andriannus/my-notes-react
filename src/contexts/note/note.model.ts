export interface INote {
  archived: boolean;
  body: string;
  createdAt: string;
  id: string;
  title: string;
}

export interface INoteContext {
  archiveNote(noteId: string): void;
  deleteNote(noteId: string): void;
  getNote(noteId?: string): INote | null;
  searchNote(title: string): INote[];
  storeNote(note: Pick<INote, "body" | "title">): void;
  unarchiveNote(noteId: string): void;
  notes: INote[];
  archivedNotes: INote[];
  notArchivedNotes: INote[];
}
