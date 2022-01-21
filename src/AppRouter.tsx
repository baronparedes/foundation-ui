import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './@utils/routes';
import Header from './components/@ui/Header';
import NotFound from './components/@ui/NotFound';
import LoginView from './components/auth/LoginView';
import {useRootState} from './store';

const AppRouter: React.FC = () => {
  const {me} = useRootState(state => state.profile);
  if (!me) {
    <Redirect to={routes.LOGIN} />;
  }
  return (
    <Switch>
      <Route path={routes.LOGIN} exact component={LoginView} />
      <Route>
        <Header />
        <div className="m-2">
          <Switch>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Route>
    </Switch>
  );
};

export default AppRouter;
