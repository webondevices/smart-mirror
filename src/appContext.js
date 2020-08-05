import React, { useReducer } from 'react';
import { Actions } from './appActions';

let AppContext = React.createContext();

let initialState = {
  faces: [],
};

let reducer = (state, action) => {
  switch (action.type) {
    case Actions.Reset:
      return initialState;
    case Actions.SetFaces:
      if (state.faces.sort().toString() !== action.payload.sort().toString()) {
        return { ...state, faces: action.payload };
      } else {
        return state;
      }
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
