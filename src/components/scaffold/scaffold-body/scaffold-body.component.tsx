import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

const ScaffoldBody: FC<PropsWithChildren> = ({ children }) => {
  return <div className="Scaffold-body">{children}</div>;
};

ScaffoldBody.propTypes = {
  children: PropTypes.node,
};

export default ScaffoldBody;
