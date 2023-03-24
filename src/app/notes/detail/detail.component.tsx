import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { AppBar } from "@/components";
import { useAuth } from "@/contexts";
import { useAPIInvoker } from "@/hooks";
import { Note, ResponseWithData } from "@/models";
import { transformToIDFormat } from "@/utils";

const Detail: FC = () => {
  const { id } = useParams();
  const { authHeaders } = useAuth();
  const { apiInvoker } = useAPIInvoker({ headers: authHeaders });

  const { t } = useTranslation("translation", {
    keyPrefix: "app.notes.detail",
  });

  const { data: note, isLoading } = useQuery(
    ["note"],
    async () => {
      const { data: Data } = await apiInvoker.get<ResponseWithData<Note>>(
        `/notes/${id}`
      );
      return Data.data;
    },
    { enabled: !!id }
  );

  const formattedCratedAt = useMemo(() => {
    if (!note?.createdAt) return "";
    return transformToIDFormat(new Date(note.createdAt));
  }, [note?.createdAt]);

  return (
    <>
      <Helmet>
        <title>{`${note?.title || t("page.title")} - myNotes`}</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton />
        <AppBar.Title>{note?.title}</AppBar.Title>
      </AppBar>

      <main className="Container">
        {isLoading ? (
          <p className="Caption">{t("content.loading")}</p>
        ) : (
          <div className="Note is-readOnly">
            <div className="Note-content">
              <p>{note?.body}</p>

              <span className="Note-createdAt">
                {t("content.created_at")} {formattedCratedAt}
              </span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Detail;
