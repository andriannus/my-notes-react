import { useQuery } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";

import { AppBar, DeleteNoteDialog, Notes, SuccessToast } from "@/components";
import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, ResponseWithData } from "@/models";

import { useNotes } from "../notes.hook";

const Archives: FC = () => {
  const { authHeaders } = useAuth();
  const { deleteNote, unarchiveNote } = useNotes();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery(["archived-notes"], async () => {
    const { data: Data } = await apiInvoker.get<ResponseWithData<Note[]>>(
      "/notes/archived"
    );
    return Data.data;
  });

  const handleNoteUnarchive = useCallback(
    async (noteID: string) => {
      await unarchiveNote(noteID);
      await refetch();
      SuccessToast("Catatan berhasil dipindah");
    },
    [unarchiveNote]
  );

  const handleNoteDelete = useCallback(
    async (noteID: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        await deleteNote(noteID);
        await refetch();
        SuccessToast("Catatan berhasil dihapus");
      }
    },
    [deleteNote]
  );

  return (
    <>
      <Helmet>
        <title>Catatan yang diarsipkan - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton href="/notes" />
        <AppBar.Title>Arsip</AppBar.Title>
      </AppBar>

      <main className="Container">
        <Notes
          emptyText="Catatan yang kamu arsipkan muncul di sini."
          isLoading={isLoading}
          notes={notes}
          onDelete={handleNoteDelete}
          onUnarchive={handleNoteUnarchive}
        />
      </main>
    </>
  );
};

export default Archives;
