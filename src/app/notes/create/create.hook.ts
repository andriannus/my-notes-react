import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useNotes } from "../notes.hook";

import { CreateNoteForm } from "./create.model";

export function useCreateNote() {
  const navigate = useNavigate();
  const { createNote, loading } = useNotes();

  const isLoading = useMemo(() => {
    return loading.isCreate;
  }, [loading.isCreate]);

  const { formState, handleSubmit, register, watch } = useForm<CreateNoteForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<CreateNoteForm>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCreateNoteFormSubmit: SubmitHandler<CreateNoteForm> = useCallback(
    async (data) => {
      await createNote(data);
      navigate("/notes");
    },
    [createNote]
  );

  return {
    formState,
    handleCreateNoteFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  };
}
