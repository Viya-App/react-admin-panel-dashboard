import React, { useState } from "react";
import AppWrapper from "./Components/AppWrapper";
import logo from "./logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppWrapper>
      <div className="App"></div>
    </AppWrapper>
  );
}

export default App;
