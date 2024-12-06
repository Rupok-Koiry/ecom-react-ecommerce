import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React from "react";

const RootLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="bg-primary-background">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default RootLayout;
