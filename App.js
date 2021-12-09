import React from 'react';
import {Store} from './redux/store';
import Main from './screen/mainScreen';
import {Provider} from 'react-redux';
const App = props => {
  return (
    <Provider store={Store}>
      <Main {...props} />
    </Provider>
  );
};

export default App;
