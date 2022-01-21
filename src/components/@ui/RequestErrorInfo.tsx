import {ApprovedAny} from '../../@types';
import ErrorInfo from './ErrorInfo';

type Props = {
  error: ApprovedAny | string;
};

export const RequestErrorInfo = ({error}: Props) => {
  if (typeof error === 'string') {
    return <ErrorInfo>{error}</ErrorInfo>;
  }

  if (error.fieldErrors) {
    return (
      <ErrorInfo>
        <ul>
          {error.fieldErrors.map((fe: {er: ApprovedAny}) => {
            return <li>{fe.er}</li>;
          })}
        </ul>
      </ErrorInfo>
    );
  }

  return <ErrorInfo>{error.message}</ErrorInfo>;
};
