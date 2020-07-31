import React from 'react';
import { AppContext } from '../../appContext';
import { Route } from 'react-router-dom';
import '../../styles/main.css';

const scrollTop = () => window.scrollTo(0, 0);

class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    scrollTop();
  }

  componentDidUpdate(previousProps) {
    if (this.props.path !== previousProps.path) {
      scrollTop();
    }
  }

  render() {
    return (
      <>
        <Route {...this.props} />
      </>
    );
  }
}

Screen.contextType = AppContext;

export default Screen;
