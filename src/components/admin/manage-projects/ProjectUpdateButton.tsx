import {useState} from 'react';
import {Button} from 'react-bootstrap';
import {FaPencilAlt} from 'react-icons/fa';

import {ProjectAttr, useUpdateProject} from '../../../Api';
import ModalContainer from '../../@ui/ModalContainer';
import {RequestErrorInfo} from '../../@ui/RequestErrorInfo';
import ProjectForm from './ProjectForm';

const ProjectUpdateButton: React.FC<{
  project: ProjectAttr;
  onUpdate?: (updatedProject: ProjectAttr) => void;
}> = ({project, onUpdate}) => {
  const [toggle, setToggle] = useState(false);
  const {loading, error, mutate} = useUpdateProject({id: Number(project.id)});
  const onSubmit = (formData: ProjectAttr) => {
    mutate({...formData, remarks: formData.remarks || ''})
      .then(data => {
        onUpdate && onUpdate(data);
        setToggle(false);
      })
      .catch(() => {});
  };
  return (
    <>
      <Button
        aria-label="update"
        variant="primary"
        size="sm"
        title="update"
        onClick={() => {
          setToggle(true);
        }}
      >
        <FaPencilAlt />
      </Button>
      <ModalContainer
        size="lg"
        header={<h5>Update {project.name}</h5>}
        toggle={toggle}
        onClose={() => setToggle(false)}
      >
        <ProjectForm
          label="Update"
          project={project}
          onSubmit={onSubmit}
          loading={loading}
          renderError={<>{error && <RequestErrorInfo error={error} />}</>}
        />
      </ModalContainer>
    </>
  );
};

export default ProjectUpdateButton;
