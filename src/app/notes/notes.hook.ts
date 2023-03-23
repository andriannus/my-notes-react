import { useCallback } from "react";

import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, Response } from "@/models";

export function useNotes() {
  const { authHeaders } = useAuth();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const createNote = useCallback(async (note: Pick<Note, "body" | "title">) => {
    try {
      await apiInvoker.post<Response<Note>>("/notes", note);
    } catch (error) {}
  }, []);

  const archiveNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.post<Omit<Response<undefined>, "data">>(
        `/notes/${noteID}/archive`
      );
    } catch (error) {}
  }, []);

  const unarchiveNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.post<Omit<Response<undefined>, "data">>(
        `/notes/${noteID}/unarchive`
      );
    } catch (error) {}
  }, []);

  const deleteNote = useCallback(async (noteID: string) => {
    try {
      await apiInvoker.delete<Omit<Response<undefined>, "data">>(
        `/notes/${noteID}`
      );
    } catch (error) {}
  }, []);

  return { archiveNote, createNote, deleteNote, unarchiveNote };
}
