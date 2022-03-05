import {Button, Col, Container, Form, InputGroup} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import styled from 'styled-components';

import {
  decimalPatternRule,
  validateGreaterThanZero,
} from '../../../@validation';
import {ProjectAttr} from '../../../Api';
import {RECORD_STATUS} from '../../../constants';
import ButtonLoading from '../../@ui/ButtonLoading';

const FormContainer = styled(Container)`
  min-width: '600px';
  width: '600px';
`;

type FormData = ProjectAttr & {remarks?: string};
type Props = {
  project?: ProjectAttr;
  label: string;
  loading?: boolean;
  editProjectCode?: boolean;
  renderError?: React.ReactNode;
  onSubmit: (formData: ProjectAttr) => void;
};

const ProjectForm = ({
  project,
  label,
  loading,
  editProjectCode,
  renderError,
  onSubmit,
}: Props) => {
  const initialValue: FormData = {
    name: project?.name || '',
    code: project?.code || '',
    location: project?.location || '',
    estimatedCost: project?.estimatedCost || 0,
    status: project?.status || 'active',
    remarks: project?.remarks,
  };
  const {handleSubmit, control, reset, formState} = useForm<FormData>({
    defaultValues: initialValue,
  });
  const onReset = () => {
    reset(initialValue);
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)} role="form">
          <Col>
            <Controller
              name="name"
              control={control}
              render={({field}) => (
                <InputGroup className="mb-2">
                  <Form.Label htmlFor="name" column sm={3}>
                    name
                  </Form.Label>
                  <Form.Control
                    {...field}
                    id="name"
                    required
                    placeholder="name"
                    disabled={loading}
                  />
                </InputGroup>
              )}
            />
          </Col>
          {editProjectCode && (
            <Col>
              <Controller
                name="code"
                control={control}
                render={({field}) => (
                  <InputGroup className="mb-2">
                    <Form.Label htmlFor="code" column sm={3}>
                      code
                    </Form.Label>
                    <Form.Control
                      {...field}
                      id="code"
                      required
                      placeholder="code"
                      disabled={loading}
                    />
                  </InputGroup>
                )}
              />
            </Col>
          )}
          <Col>
            <Controller
              name="location"
              control={control}
              render={({field}) => (
                <InputGroup className="mb-2">
                  <Form.Label htmlFor="location" column sm={3}>
                    location
                  </Form.Label>
                  <Form.Control
                    {...field}
                    id="location"
                    disabled={loading}
                    required
                    placeholder="location"
                  />
                </InputGroup>
              )}
            />
          </Col>
          <Col>
            <Controller
              name="estimatedCost"
              control={control}
              rules={{
                pattern: decimalPatternRule,
                validate: validateGreaterThanZero,
              }}
              render={({field}) => (
                <InputGroup className="mb-2">
                  <Form.Label htmlFor="estimatedCost" column sm={3}>
                    estimated cost
                  </Form.Label>
                  <Form.Control
                    {...field}
                    id="estimatedCost"
                    disabled={loading}
                    required
                    step="any"
                    type="number"
                    placeholder="estimated cost"
                    isInvalid={formState.errors.estimatedCost !== undefined}
                  />
                  <Form.Control.Feedback type="invalid" className="text-right">
                    {formState.errors.estimatedCost?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              )}
            />
          </Col>
          <Col>
            <Controller
              name="status"
              control={control}
              render={({field}) => (
                <InputGroup className="mb-2">
                  <Form.Label htmlFor="status" column sm={3}>
                    status
                  </Form.Label>
                  <Form.Control as="select" {...field} id="status">
                    {RECORD_STATUS.map((s, i) => {
                      return (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      );
                    })}
                  </Form.Control>
                </InputGroup>
              )}
            />
          </Col>
          <Col>
            <Controller
              name="remarks"
              control={control}
              render={({field}) => (
                <InputGroup className="mb-2">
                  <Form.Label htmlFor="remarks" column sm={3}>
                    remarks
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    {...field}
                    rows={5}
                    disabled={loading}
                    placeholder="remarks"
                    id="remarks"
                  />
                </InputGroup>
              )}
            />
          </Col>
          {renderError}
          <Col className="text-right mb-2">
            <ButtonLoading
              variant="primary"
              type="submit"
              disabled={loading}
              loading={loading}
            >
              {label}
            </ButtonLoading>
            <Button
              variant="info"
              disabled={loading}
              onClick={onReset}
              className="ml-2"
            >
              Reset
            </Button>
          </Col>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProjectForm;
