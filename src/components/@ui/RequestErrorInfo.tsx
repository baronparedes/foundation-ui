import {ApprovedAny} from '../../@types';
import ErrorInfo from './ErrorInfo';

type Props = {
  error: ApprovedAny | string;
};

export const RequestErrorInfo = ({error}: Props) => {
  if (typeof error === 'string') {
    return <ErrorInfo>{error}</ErrorInfo>;
  }

  if (error.data?.fieldErrors) {
    return (
      <ErrorInfo>
        <ul>
          {error.data.fieldErrors.map((fe: ApprovedAny) => {
            return <li>{fe.message}</li>;
          })}
        </ul>
      </ErrorInfo>
    );
  }

  return <ErrorInfo>{error.message}</ErrorInfo>;
};
