import {useState} from 'react';
import {Button} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';

import {ProjectAttr, useCreateProject} from '../../../Api';
import ModalContainer from '../../@ui/ModalContainer';
import {RequestErrorInfo} from '../../@ui/RequestErrorInfo';
import ProjectForm from './ProjectForm';

const ProjectCreateButton: React.FC<{
  onCreate?: (createdProject: ProjectAttr) => void;
}> = ({onCreate}) => {
  const [toggle, setToggle] = useState(false);
  const {loading, error, mutate} = useCreateProject({});
  const onSubmit = (formData: ProjectAttr) => {
    mutate({...formData, remarks: formData.remarks || ''})
      .then(data => {
        onCreate && onCreate(data);
        setToggle(false);
      })
      .catch(() => {});
  };
  return (
    <>
      <Button
        aria-label="create"
        variant="success"
        size="sm"
        title="create"
        onClick={() => {
          setToggle(true);
        }}
      >
        <FaPlus />
      </Button>
      <ModalContainer
        size="lg"
        header={<h5>Create a new project</h5>}
        toggle={toggle}
        onClose={() => setToggle(false)}
      >
        <ProjectForm
          label="Create"
          onSubmit={onSubmit}
          loading={loading}
          renderError={<>{error && <RequestErrorInfo error={error} />}</>}
          editProjectCode
        />
      </ModalContainer>
    </>
  );
};

export default ProjectCreateButton;
