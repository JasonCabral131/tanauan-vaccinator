import React from 'react';

import {useSelector} from 'react-redux';
import TheLogin from './TheLogin';
import TheNavigation from './TheNavigation';
const Main = props => {
  const {isAuthenticated, token, user} = useSelector(state => state.auth);
  //return <TheNavigation {...props} />;
  return isAuthenticated ? (
    <TheNavigation {...props} />
  ) : (
    <TheLogin {...props} />
  );
};
export default Main;
