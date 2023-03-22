import PropTypes from "prop-types";
import { FC, memo, PropsWithChildren } from "react";

import { AppBarActions } from "./app-bar-actions";
import { AppBarBackButton } from "./app-bar-back-button";
import { AppBarBrand } from "./app-bar-brand";
import { AppBarTitle } from "./app-bar-title";

import "./app-bar.component.scss";

const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AppBar">{children}</div>;
};

AppBar.propTypes = {
  children: PropTypes.node,
};

export default Object.assign(memo(AppBar), {
  Actions: memo(AppBarActions),
  BackButton: memo(AppBarBackButton),
  Brand: memo(AppBarBrand),
  Title: memo(AppBarTitle),
});
