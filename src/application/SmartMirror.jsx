import React from "react";
import { AppContextProvider } from "../appContext";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Screen from "../components/Screen/Screen";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Screen path="/" component={Home} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

export default App;
