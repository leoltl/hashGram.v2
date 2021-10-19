import React from "react";
import Feed from "./pages/Feed";
import "./Global.css";

function App() {
  
  React.useEffect(() => {
    // https://epicreact.dev/css-variables/
    document.body.dataset.theme = 'light'
  }, []);

  return (
    <main>
      <Feed />  
    </main>
  )
}

export default App;
