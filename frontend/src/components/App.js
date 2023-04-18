import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import DimensionsProvider from './DimensionsProvider';
import CategoryComponent from './CategoryComponent';
import Login from './Login';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <DimensionsProvider>
            <CategoryComponent/>
          </DimensionsProvider>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
