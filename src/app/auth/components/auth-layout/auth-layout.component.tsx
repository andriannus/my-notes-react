import { FC, PropsWithChildren } from "react";

import { AuthLayoutBody } from "./auth-layout-body";
import { AuthLayoutFooter } from "./auth-layout-footer";

import "./auth-layout.component.scss";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className="AuthLayout">{children}</main>;
};

export default Object.assign(AuthLayout, {
  Body: AuthLayoutBody,
  Footer: AuthLayoutFooter,
});
