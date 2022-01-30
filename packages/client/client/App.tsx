import React from "react";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import "./Global.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

function App() {
  React.useEffect(() => {
    // https://epicreact.dev/css-variables/
    document.body.dataset.theme = "light";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route index element={<Feed />} />
      </Route>
    </Routes>
  );
}

export default App;
