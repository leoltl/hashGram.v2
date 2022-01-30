import React from "react";
import Feed from "./pages/Feed";
import "./Global.css";
import TopNav from "./components/TopNav/TopNav";

function App() {
  React.useEffect(() => {
    // https://epicreact.dev/css-variables/
    document.body.dataset.theme = "light";
  }, []);

  return (
    <main>
      <TopNav />
      <div style={{ height: "var(--topnav-height)" }}>ok</div>
      <Feed />
    </main>
  );
}

export default App;
