import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";

import { AppBar, DeleteNoteDialog, Notes, SuccessToast } from "@/components";
import { useNote } from "@/contexts";

const Archives: FC = () => {
  const { archivedNotes, deleteNote, unarchiveNote } = useNote();

  const handleNoteUnarchive = useCallback(
    (noteId: string) => {
      unarchiveNote(noteId);
      SuccessToast("Catatan berhasil dipindah");
    },
    [unarchiveNote]
  );

  const handleNoteDelete = useCallback(
    async (noteId: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        deleteNote(noteId);
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
          notes={archivedNotes}
          onDelete={handleNoteDelete}
          onUnarchive={handleNoteUnarchive}
        />
      </main>
    </>
  );
};

export default Archives;
