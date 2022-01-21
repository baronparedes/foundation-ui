import {Col, Form, InputGroup} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import {FaKey, FaUserAlt} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Profile} from '../../@types';
import routes from '../../@utils/routes';
import {useRootState} from '../../store';
import {profileActions} from '../../store/reducers/profile.reducer';
import ButtonLoading from '../@ui/ButtonLoading';
import ErrorInfo from '../@ui/ErrorInfo';

type FormData = {
  username: string;
  password: string;
};

const data = {
  profile: {
    name: 'Baron Paredes',
    username: 'baronp',
    type: 'admin',
  },
  token: 'some_token',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const {token} = useRootState(state => state.profile);
  const loading = false;
  const error = null;
  // const {mutate, loading, error} = useAuth({});
  const {handleSubmit, control} = useForm<FormData>({
    defaultValues: {
      password: '',
      username: '',
    },
  });
  const onSubmit = (formData: FormData) => {
    console.log(formData);
    // const bearer = `${formData.username}:${formData.password}`;
    // const credentials = Buffer.from(bearer).toString('base64');
    // mutate(undefined, {headers: {Authorization: `Basic ${credentials}`}})
    //   .then(data => {
    //     if (data) {
    dispatch(
      profileActions.signIn({
        me: data.profile as Profile,
        token: data.token,
      })
    );
    //     }
    //   })
    //   .catch(() => {});
  };
  if (token) {
    return <Redirect to={routes.ROOT} />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Col>
          <Controller
            name="username"
            control={control}
            render={({field}) => (
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaUserAlt />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  {...field}
                  disabled={loading}
                  required
                  placeholder="username"
                />
              </InputGroup>
            )}
          />
        </Col>
        <Col>
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaKey />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  {...field}
                  disabled={loading}
                  required
                  type="password"
                  placeholder="password"
                />
              </InputGroup>
            )}
          />
        </Col>
        {error && (
          <Col>
            <ErrorInfo>unable to login</ErrorInfo>
          </Col>
        )}
        <Col className="text-center pb-3">
          <ButtonLoading
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-100"
            loading={loading}
          >
            Sign In
          </ButtonLoading>
        </Col>
      </Form>
    </>
  );
};

export default LoginForm;
