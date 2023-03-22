import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";

import {
  AppBar,
  CreateNote,
  DeleteNoteDialog,
  Notes,
  SuccessToast,
} from "@/components";
import { INote, useNote } from "@/contexts";

const Home: FC = () => {
  const { archiveNote, deleteNote, notArchivedNotes, storeNote } = useNote();

  const handleNoteStore = useCallback(
    (note: Pick<INote, "body" | "title">) => storeNote(note),
    [storeNote]
  );

  const handleNoteArchive = useCallback(
    (noteId: string) => {
      archiveNote(noteId);
      SuccessToast("Catatan berhasil diarsip");
    },
    [archiveNote]
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
        <title>Catat apapun yang kamu inginkan! - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Brand>myNotes</AppBar.Brand>
        <AppBar.Actions />
      </AppBar>

      <main className="Container">
        <CreateNote onClose={handleNoteStore} />

        <Notes
          emptyText="Kamu belum membuat catatan. Yuk, buat sekarang."
          notes={notArchivedNotes}
          onArchive={handleNoteArchive}
          onDelete={handleNoteDelete}
        />
      </main>
    </>
  );
};

export default Home;
