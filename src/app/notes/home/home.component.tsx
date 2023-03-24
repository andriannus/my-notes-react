import { useQuery } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

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
  const { archiveNote, createNote, deleteNote, loading } = useNotes();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const { t } = useTranslation("translation", { keyPrefix: "app.notes.home" });

  const {
    data: notes = [],
    isFetching,
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
      SuccessToast(t("toast.archive"));
    },
    [archiveNote]
  );

  const handleNoteDelete = useCallback(
    async (noteID: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        await deleteNote(noteID);
        await refetch();
        SuccessToast(t("toast.delete"));
      }
    },
    [deleteNote]
  );

  return (
    <>
      <Helmet>
        <title>{t("page.title")}</title>
      </Helmet>

      <AppBar>
        <AppBar.Brand>myNotes</AppBar.Brand>
        <AppBar.Actions />
      </AppBar>

      <main className="Container">
        <CreateNote onClose={handleNoteCreate} />

        <Notes
          emptyText={t<string>("notes.empty_text")}
          isFetching={isFetching}
          isLoading={loading.isArchive || loading.isDelete}
          notes={notes}
          onArchive={handleNoteArchive}
          onDelete={handleNoteDelete}
        />
      </main>
    </>
  );
};

export default Home;
