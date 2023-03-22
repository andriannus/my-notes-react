import PropTypes from "prop-types";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button, SuccessToast, TextArea, TextField } from "@/components";
import { INote } from "@/contexts";

import "./create-note.component.scss";

interface CreateNoteProps {
  onClose(note: Pick<INote, "body" | "title">): void;
}

const CreateNote: FC<CreateNoteProps> = ({ onClose = () => {} }) => {
  const [isFormShown, setFormStatus] = useState(false);

  const [note, setNote] = useState({
    body: "",
    title: "",
  });

  const hasContentOrTitle = useMemo(() => {
    return !!note.body || !!note.title;
  }, [note.body, note.title]);

  const setFocusToTextArea = useCallback(() => {
    const textArea = document.getElementById("TxtBody") as HTMLTextAreaElement;
    textArea.focus();
  }, []);

  useEffect(() => {
    if (isFormShown) {
      setFocusToTextArea();
    } else {
      setNote(() => ({ body: "", title: "" }));
    }
  }, [isFormShown, setFocusToTextArea]);

  function handleButtonClick(): void {
    if (hasContentOrTitle) {
      onClose(note);
      setNote(() => ({ body: "", title: "" }));
      SuccessToast("Catatan berhasil dibuat");
    }

    setFormStatus(!isFormShown);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    setNote((currentNote) => ({
      ...currentNote,
      title: event.target.value,
    }));
  }

  function handleBodyChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setNote((currentNote) => ({
      ...currentNote,
      body: event.target.value,
    }));
  }

  return (
    <div className="CreateNote">
      {!isFormShown && (
        <div
          className="CreateNote-onBoard"
          onClick={() => setFormStatus(!isFormShown)}
        >
          <span>Buat catatan...</span>
        </div>
      )}

      {isFormShown && (
        <div className="px-xs py-sm">
          <TextField
            id="TxtTitle"
            value={note.title}
            className="mb-sm"
            counter={50}
            placeholder="Judul"
            onChange={handleTitleChange}
          />

          <TextArea
            id="TxtBody"
            value={note.body}
            className="mb-bs"
            placeholder="Buat catatan..."
            onChange={handleBodyChange}
          />

          <div className="text-right">
            <Button id="BtnClose" type="button" onClick={handleButtonClick}>
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

CreateNote.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default memo(CreateNote);