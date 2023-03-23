import { Note } from "@/models";

export interface NotesProps {
  emptyText: string;
  isLoading: boolean;
  notes: Note[];
  onArchive(id: string): void;
  onDelete(id: string): void;
  onUnarchive(id: string): void;
}
