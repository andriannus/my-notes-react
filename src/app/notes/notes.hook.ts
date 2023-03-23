import { useCallback } from "react";

import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, Response, ResponseWithData } from "@/models";

export function useNotes() {
  const { authHeaders } = useAuth();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const createNote = useCallback(async (note: Pick<Note, "body" | "title">) => {
    try {
      await apiInvoker.post<ResponseWithData<Note>>("/notes", note);
    } catch (error) {}
  }, []);

  const archiveNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.post<Response>(`/notes/${noteID}/archive`);
    } catch (error) {}
  }, []);

  const unarchiveNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.post<Response>(`/notes/${noteID}/unarchive`);
    } catch (error) {}
  }, []);

  const deleteNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.delete<Response>(`/notes/${noteID}`);
    } catch (error) {}
  }, []);

  return { archiveNote, createNote, deleteNote, unarchiveNote };
}
