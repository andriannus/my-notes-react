import { useQuery } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { AppBar, DeleteNoteDialog, Notes, SuccessToast } from "@/components";
import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, ResponseWithData } from "@/models";

import { useNotes } from "../notes.hook";

const Archives: FC = () => {
  const { authHeaders } = useAuth();
  const { deleteNote, loading, unarchiveNote } = useNotes();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const { t } = useTranslation("translation", {
    keyPrefix: "app.notes.archives",
  });

  const {
    data: notes = [],
    isFetching,
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
      SuccessToast(t("toast.unarchive"));
    },
    [unarchiveNote]
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
        <AppBar.BackButton href="/notes" />
        <AppBar.Title>{t("app_bar.title")}</AppBar.Title>
      </AppBar>

      <main className="Container">
        <Notes
          emptyText={t<string>("notes.empty_text")}
          isFetching={isFetching}
          isLoading={loading.isUnarchive || loading.isDelete}
          notes={notes}
          onDelete={handleNoteDelete}
          onUnarchive={handleNoteUnarchive}
        />
      </main>
    </>
  );
};

export default Archives;
