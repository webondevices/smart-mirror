import React, { useEffect } from 'react';
import { AppContextProvider } from '../appContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Screen from '../components/Screen/Screen';
import FaceID from '../components/FaceId';

const App = () => {
  return (
    <AppContextProvider>
      {/* <FaceID> */}
      <Router>
        <Switch>
          <Screen path="/" component={Home} />
        </Switch>
      </Router>
      {/* </FaceID> */}
    </AppContextProvider>
  );
};

export default App;
