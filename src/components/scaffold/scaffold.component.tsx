import PropTypes from "prop-types";
import { FC, memo, PropsWithChildren } from "react";

import { ScaffoldBody } from "./scaffold-body";
import { ScaffoldFooter } from "./scaffold-footer";

import "./scaffold.component.scss";

const Scaffold: FC<PropsWithChildren> = ({ children }) => {
  return <main className="Scaffold">{children}</main>;
};

Scaffold.propTypes = {
  children: PropTypes.node,
};

export default Object.assign(memo(Scaffold), {
  Body: memo(ScaffoldBody),
  Footer: memo(ScaffoldFooter),
});
