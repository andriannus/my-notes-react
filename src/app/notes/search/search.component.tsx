import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  AppBar,
  DeleteNoteDialog,
  Notes,
  SearchField,
  SuccessToast,
} from "@/components";
import { INote, useNote } from "@/contexts";
import { debounce } from "@/utils";

const Search: FC = () => {
  const { archiveNote, deleteNote, searchNote, unarchiveNote } = useNote();

  const [notes, setNotes] = useState([] as INote[]);

  const verifySearch = useMemo(
    () =>
      debounce((search: string) => {
        const notes = searchNote(search);
        setNotes(notes);
      }, 300),
    [searchNote]
  );

  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    verifySearch(noteTitle);
  }, [noteTitle, verifySearch]);

  const handleNoteArchive = useCallback(
    (noteId: string) => {
      archiveNote(noteId);
      verifySearch(noteTitle);
      SuccessToast("Catatan berhasil dipindah");
    },
    [archiveNote, noteTitle, verifySearch]
  );

  const handleNoteUnarchive = useCallback(
    (noteId: string) => {
      unarchiveNote(noteId);
      verifySearch(noteTitle);
      SuccessToast("Catatan berhasil diarsip");
    },
    [noteTitle, unarchiveNote, verifySearch]
  );

  const handleNoteDelete = useCallback(
    async (noteId: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        deleteNote(noteId);
        verifySearch(noteTitle);
        SuccessToast("Catatan berhasil dihapus");
      }
    },
    [deleteNote, noteTitle, verifySearch]
  );

  return (
    <>
      <Helmet>
        <title>Cari catatan - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton href="/notes" />
        <AppBar.Title>Pencarian</AppBar.Title>
      </AppBar>

      <main className="Container">
        <SearchField
          id="TxtSearchTrack"
          value={noteTitle}
          autoComplete="off"
          placeholder="Masukkan judul catatan..."
          onChange={(event) => setNoteTitle(event.target.value)}
        />

        <Notes
          emptyText="Catatan yang kamu cari tidak ditemukan."
          notes={notes}
          onArchive={handleNoteArchive}
          onDelete={handleNoteDelete}
          onUnarchive={handleNoteUnarchive}
        />
      </main>
    </>
  );
};

export default Search;
