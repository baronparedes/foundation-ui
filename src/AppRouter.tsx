import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './@utils/routes';
import Header from './components/@ui/Header';
import NotFound from './components/@ui/NotFound';
import ProtectedRoute from './components/@ui/ProtectedRoute';
import ProfilesView from './components/admin/manage-profiles/ProfilesView';
import LoginView from './components/auth/LoginView';
import {useRootState} from './store';

const AdminRoutes = () => {
  return (
    <>
      <ProtectedRoute
        path={routes.ADMIN_PROFILES}
        exact
        onlyFor={['admin']}
        component={ProfilesView}
      />
    </>
  );
};

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
            <AdminRoutes />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Route>
    </Switch>
  );
};

export default AppRouter;
