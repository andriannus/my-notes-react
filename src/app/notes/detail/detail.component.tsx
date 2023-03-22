import { FC, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import { AppBar } from "@/components";
import { useNote } from "@/contexts";
import { transformToIDFormat } from "@/utils";

const Detail: FC = () => {
  const { id } = useParams();
  const { getNote } = useNote();

  const selectedNote = useMemo(() => {
    return getNote(id);
  }, [id]);

  const formattedCratedAt = useMemo(() => {
    if (!selectedNote?.createdAt) return "";
    return transformToIDFormat(new Date(selectedNote.createdAt));
  }, [selectedNote?.createdAt]);

  if (!selectedNote?.id) {
    return <Navigate replace to="/404" />;
  }

  return (
    <>
      <Helmet>
        <title>{`${selectedNote?.title} - myNotes`}</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton />
        <AppBar.Title>{selectedNote?.title}</AppBar.Title>
      </AppBar>

      <main className="Container">
        <div className="Note is-readOnly">
          <div className="Note-content">
            <p>{selectedNote.body}</p>
            <span className="Note-createdAt">Dibuat: {formattedCratedAt}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Detail;
