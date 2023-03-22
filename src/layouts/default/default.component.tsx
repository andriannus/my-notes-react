import { FC } from "react";
import { Outlet } from "react-router-dom";

import "./default.component.scss";

const DefaultLayout: FC = () => {
  return (
    <div className="DefaultLayout">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
