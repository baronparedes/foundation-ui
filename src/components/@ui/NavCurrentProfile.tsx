import {useState} from 'react';
import {Button, Navbar} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Profile} from '../../@types';
import routes from '../../@utils/routes';
import {useRootState} from '../../store';
import {profileActions} from '../../store/reducers/profile.reducer';
import Avatar from './Avatar';
import ModalContainer from './ModalContainer';

const AvatarProfile: React.FC<{profile: Profile}> = ({profile}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {profile && (
        <>
          <Avatar onClick={() => setToggle(true)} name={profile.name} />
          <ModalContainer
            header={<h5>Update your profile</h5>}
            toggle={toggle}
            onClose={() => setToggle(false)}
          >
            TBD
          </ModalContainer>
        </>
      )}
    </>
  );
};

const NavCurrentProfile = () => {
  const profile = useRootState(state => state.profile);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(profileActions.signOut());
  };
  if (profile && !profile.token) {
    return <Redirect to={routes.LOGIN} />;
  }
  return (
    <>
      {profile && profile.me && (
        <>
          <Navbar.Text className="mr-2">
            <AvatarProfile profile={profile.me} />
          </Navbar.Text>
          <Navbar.Text>
            <Button variant="secondary" onClick={handleOnClick} size="sm">
              Sign Out
            </Button>
          </Navbar.Text>
        </>
      )}
    </>
  );
};

export default NavCurrentProfile;
