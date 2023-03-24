import { FC, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { AppBar, Button, Scaffold, TextArea, TextField } from "@/components";

import { useCreateNote } from "./create.hook";

const Create: FC = () => {
  const {
    handleCreateNoteFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  } = useCreateNote();

  const { t } = useTranslation("translation", {
    keyPrefix: "app.notes.create",
  });

  const setFocusToTextArea = useCallback(() => {
    const textArea = document.getElementById("TxtBody") as HTMLTextAreaElement;
    textArea.focus();
  }, []);

  useEffect(() => {
    setFocusToTextArea();
  }, [setFocusToTextArea]);

  return (
    <>
      <Helmet>
        <title>{t("page.title")}</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton href="/notes" />
        <AppBar.Title>{t("app_bar.title")}</AppBar.Title>
        <AppBar.Actions />
      </AppBar>

      <form onSubmit={handleSubmit(handleCreateNoteFormSubmit)}>
        <Scaffold>
          <Scaffold.Body>
            <TextField
              id="TxtTitle"
              value={values.title}
              className="mb-sm"
              counter={50}
              placeholder={t<string>("form.title")}
              {...register("title")}
            />

            <TextArea
              id="TxtBody"
              value={values.body}
              className="mb-bs"
              placeholder={t<string>("form.body")}
              {...register("body")}
            />
          </Scaffold.Body>

          <Scaffold.Footer>
            <Button
              id="BtnSubmit"
              color="primary"
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {isLoading ? t("form.button.loading") : t("form.button.text")}
            </Button>
          </Scaffold.Footer>
        </Scaffold>
      </form>
    </>
  );
};

export default Create;
