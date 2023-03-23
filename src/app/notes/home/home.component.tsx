import { useQuery } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";

import {
  AppBar,
  CreateNote,
  DeleteNoteDialog,
  Notes,
  SuccessToast,
} from "@/components";
import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, ResponseWithData } from "@/models";

import { useNotes } from "../notes.hook";

const Home: FC = () => {
  const { authHeaders } = useAuth();
  const { archiveNote, createNote, deleteNote } = useNotes();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery(["not-archived-notes"], async () => {
    const { data: Data } = await apiInvoker.get<ResponseWithData<Note[]>>(
      "/notes"
    );
    return Data.data;
  });

  const handleNoteCreate = useCallback(
    async (note: Pick<Note, "body" | "title">) => {
      await createNote(note);
      await refetch();
    },
    [createNote]
  );

  const handleNoteArchive = useCallback(
    async (noteID: string) => {
      await archiveNote(noteID);
      await refetch();
      SuccessToast("Catatan berhasil diarsip");
    },
    [archiveNote]
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
        <title>Catat apapun yang kamu inginkan! - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Brand>myNotes</AppBar.Brand>
        <AppBar.Actions />
      </AppBar>

      <main className="Container">
        <CreateNote onClose={handleNoteCreate} />

        <Notes
          emptyText="Kamu belum membuat catatan. Yuk, buat sekarang."
          isLoading={isLoading}
          notes={notes}
          onArchive={handleNoteArchive}
          onDelete={handleNoteDelete}
        />
      </main>
    </>
  );
};

export default Home;
