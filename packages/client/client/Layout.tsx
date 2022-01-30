import React from "react";
import TopNav from "./components/TopNav/TopNav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <TopNav />
      <div style={{ height: "var(--topnav-height)" }} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
