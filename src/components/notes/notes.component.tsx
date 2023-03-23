import PropTypes from "prop-types";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Masonry } from "@/components";
import { Note } from "@/contexts";
import { truncate } from "@/utils";

interface NotesProps {
  emptyText: string;
  notes: Note[];
  onArchive(id: string): void;
  onDelete(id: string): void;
  onUnarchive(id: string): void;
}

const Notes: FC<Partial<NotesProps>> = ({
  emptyText = "",
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
      {notes.length < 1 ? (
        <p className="text-center text-gray-500">{emptyText}</p>
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
