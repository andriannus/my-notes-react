import { FC } from "react";
import { Helmet } from "react-helmet-async";

import { AppBar } from "@/components";

const NotFound: FC = () => {
  return (
    <>
      <Helmet>
        <title>Halaman tidak ditemukan - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.BackButton href="/notes" replace />
      </AppBar>

      <main className="Container">
        <p className="text-center text-gray-500">
          Ups... halaman tidak ditemukan
        </p>
      </main>
    </>
  );
};

export default NotFound;
