import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './@utils/routes';
import Navigation from './components/@ui-domain/Navigation';
import ProtectedRoute from './components/@ui-domain/ProtectedRoute';
import HeaderPanel from './components/@ui/HeaderPanel';
import NotFound from './components/@ui/NotFound';
import ProfilesView from './components/admin/manage-profiles/ProfilesView';
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
        <HeaderPanel>
          <Navigation />
        </HeaderPanel>
        <div className="m-2">
          <Switch>
            <ProtectedRoute
              path={routes.ADMIN_PROFILES}
              exact
              onlyFor={['admin']}
              component={ProfilesView}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Route>
    </Switch>
  );
};

export default AppRouter;
