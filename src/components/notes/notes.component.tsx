import PropTypes from "prop-types";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Masonry } from "@/components";
import { truncate } from "@/utils";

import { NotesProps } from "./notes.model";

const Notes: FC<Partial<NotesProps>> = ({
  emptyText = "",
  isLoading = false,
  notes = [],
  onArchive = () => null,
  onDelete = () => null,
  onUnarchive = () => null,
}) => {
  const navigate = useNavigate();

  const handleNoteClick = useCallback((id: string) => {
    navigate(`/notes/${id}`);
  }, []);

  return (
    <>
      {isLoading ? (
        <p className="Caption">Sedang memuat...</p>
      ) : notes.length < 1 ? (
        <p className="Caption">{emptyText}</p>
      ) : (
        <Masonry>
          {notes.map((note) => {
            return (
              <div
                key={note.id}
                className="Note"
                onClick={() => handleNoteClick(note.id)}
              >
                {note.title && (
                  <div className="Note-title">
                    <p>{note.title}</p>
                  </div>
                )}

                <div className="Note-content">
                  <span>{truncate(note.body, 50)}</span>
                </div>

                <div className="Note-actions">
                  {!note.archived && (
                    <button
                      id="BtnArchive"
                      className="Note-action"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onArchive(note.id);
                      }}
                    >
                      Arsipkan
                    </button>
                  )}

                  {note.archived && (
                    <button
                      id="BtnUnarchive"
                      className="Note-action"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnarchive(note.id);
                      }}
                    >
                      Batal arsip
                    </button>
                  )}

                  <button
                    id="BtnDelete"
                    className="Note-action"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(note.id);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </Masonry>
      )}
    </>
  );
};

Notes.propTypes = {
  emptyText: PropTypes.string,
  notes: PropTypes.array,
  onArchive: PropTypes.func,
  onDelete: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default Notes;
