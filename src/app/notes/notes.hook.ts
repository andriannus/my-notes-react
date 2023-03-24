import { useCallback, useState } from "react";

import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, Response, ResponseWithData } from "@/models";

export function useNotes() {
  const { authHeaders } = useAuth();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const [loading, setIsLoading] = useState({
    isCreate: false,
    isArchive: false,
    isUnarchive: false,
    isDelete: false,
  });

  const createNote = useCallback(async (note: Pick<Note, "body" | "title">) => {
    setIsLoading((currentStatus) => ({ ...currentStatus, isCreate: true }));

    try {
      await apiInvoker.post<ResponseWithData<Note>>("/notes", note);
    } catch (error) {
      return error;
    } finally {
      setIsLoading((currentStatus) => ({ ...currentStatus, isCreate: false }));
    }
  }, []);

  const archiveNote = useCallback(async (noteID: string) => {
    setIsLoading((currentStatus) => ({ ...currentStatus, isArchive: true }));

    try {
      await apiInvoker.post<Response>(`/notes/${noteID}/archive`);
    } catch (error) {
      return error;
    } finally {
      setIsLoading((currentStatus) => ({ ...currentStatus, isArchive: false }));
    }
  }, []);

  const unarchiveNote = useCallback(async (noteID: string) => {
    setIsLoading((currentStatus) => ({ ...currentStatus, isUnarchive: true }));

    try {
      await apiInvoker.post<Response>(`/notes/${noteID}/unarchive`);
    } catch (error) {
      return error;
    } finally {
      setIsLoading((currentStatus) => ({
        ...currentStatus,
        isUnarchive: false,
      }));
    }
  }, []);

  const deleteNote = useCallback(async (noteID: string) => {
    setIsLoading((currentStatus) => ({ ...currentStatus, isDelete: true }));

    try {
      await apiInvoker.delete<Response>(`/notes/${noteID}`);
    } catch (error) {
      return error;
    } finally {
      setIsLoading((currentStatus) => ({ ...currentStatus, isDelete: false }));
    }
  }, []);

  return { archiveNote, createNote, deleteNote, loading, unarchiveNote };
}
