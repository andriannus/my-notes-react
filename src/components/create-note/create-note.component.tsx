import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./create-note.component.scss";

const CreateNote: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation("translation", {
    keyPrefix: "components.create_note",
  });

  const handleOnBoardClick = useCallback(() => {
    navigate("/notes/create");
  }, [navigate]);

  return (
    <div className="CreateNote">
      <div
        className="CreateNote-onBoard"
        role="button"
        onClick={handleOnBoardClick}
      >
        <span>{t("on_board")}</span>
      </div>
    </div>
  );
};

export default memo(CreateNote);
