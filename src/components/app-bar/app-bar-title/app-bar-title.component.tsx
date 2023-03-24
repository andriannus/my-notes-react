import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

import "./app-bar-title.component.scss";

const AppBarTitle: FC<PropsWithChildren> = ({ children }) => {
  return <span className="AppBar-title">{children}</span>;
};

AppBarTitle.propTypes = {
  children: PropTypes.node,
};

export default AppBarTitle;
