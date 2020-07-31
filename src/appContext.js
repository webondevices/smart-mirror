import React, { useReducer } from "react";
import { Actions } from "./appActions";

let AppContext = React.createContext();

let initialState = {};

let reducer = (state, action) => {
  switch (action.type) {
    case Actions.Reset:
      return initialState;
  }
};

function AppContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
