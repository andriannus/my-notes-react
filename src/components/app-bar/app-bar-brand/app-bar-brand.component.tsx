import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

import "./app-bar-brand.component.scss";

const AppBarBrand: FC<PropsWithChildren> = ({ children }) => {
  return <span className="AppBar-brand">{children}</span>;
};

AppBarBrand.propTypes = {
  children: PropTypes.node,
};

export default AppBarBrand;
