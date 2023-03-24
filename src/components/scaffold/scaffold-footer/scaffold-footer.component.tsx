import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

const ScaffoldFooter: FC<PropsWithChildren> = ({ children }) => {
  return <div className="Scaffold-footer">{children}</div>;
};

ScaffoldFooter.propTypes = {
  children: PropTypes.node,
};

export default ScaffoldFooter;
