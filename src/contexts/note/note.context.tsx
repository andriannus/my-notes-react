import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { transformToISOFormat } from "@/utils/date";

import { DEFAULT_NOTES } from "./note.constant";
import { INote, INoteContext } from "./note.model";

export const NoteContext = createContext<INoteContext>({
  archiveNote: () => null,
  deleteNote: () => null,
  getNote: () => null,
  searchNote: () => [],
  storeNote: () => null,
  unarchiveNote: () => null,
  notes: [],
  archivedNotes: [],
  notArchivedNotes: [],
});

export const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState(DEFAULT_NOTES);

  const archivedNotes = useMemo(() => {
    return notes.filter((note) => note.archived);
  }, [notes]);

  const notArchivedNotes = useMemo(() => {
    return notes.filter((note) => !note.archived);
  }, [notes]);

  const getNote = useCallback(
    (noteId = "") => {
      const selectedNote = notes.find((note) => note.id === noteId) ?? null;
      return selectedNote;
    },
    [notes]
  );

  function storeNote(note: Pick<INote, "body" | "title">): void {
    const newNote: INote = {
      ...note,
      id: nanoid(10),
      archived: false,
      createdAt: transformToISOFormat(new Date()),
    };

    if (Array.isArray(notes)) {
      setNotes([...notes, newNote]);
    } else {
      setNotes([newNote]);
    }
  }

  function utilizeNote(notes: INote[], noteId: string) {
    const tempNotes = cloneDeep(notes);
    const selectedNoteIdx = tempNotes.findIndex((note) => note.id === noteId);

    return { selectedNoteIdx, tempNotes };
  }

  function deleteNote(noteId: string): void {
    const { selectedNoteIdx, tempNotes } = utilizeNote(notes, noteId);
    tempNotes.splice(selectedNoteIdx, 1);

    setNotes(tempNotes);
  }

  function archiveNote(noteId: string): void {
    const { selectedNoteIdx, tempNotes } = utilizeNote(notes, noteId);
    tempNotes[selectedNoteIdx].archived = true;

    setNotes(tempNotes);
  }

  function unarchiveNote(noteId: string): void {
    const { selectedNoteIdx, tempNotes } = utilizeNote(notes, noteId);
    tempNotes[selectedNoteIdx].archived = false;

    setNotes(tempNotes);
  }

  const searchNote = useCallback(
    (title: string) => {
      const searchedNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(title.toLowerCase());
      });

      return searchedNotes;
    },
    [notes]
  );

  return (
    <NoteContext.Provider
      value={{
        archiveNote,
        deleteNote,
        getNote,
        searchNote,
        storeNote,
        unarchiveNote,
        notes,
        archivedNotes,
        notArchivedNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

NoteProvider.propTypes = {
  children: PropTypes.node,
};

export const useNote = () => useContext(NoteContext);
