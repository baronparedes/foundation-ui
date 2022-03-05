import classNames from 'classnames';
import {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {FaCheck, FaTimes} from 'react-icons/fa';

import {ProjectAttr, RecordStatus, useUpdateProject} from '../../../Api';
import {STATUS_COLORS} from '../../../constants';
import ProjectUpdateButton from './ProjectUpdateButton';

const ProjectTableRow: React.FC<{project: ProjectAttr}> = ({project}) => {
  const [projectState, setProjectState] = useState<ProjectAttr>({...project});
  const {mutate} = useUpdateProject({id: Number(project.id)});
  const toggleStatus = (status: RecordStatus) => {
    mutate({...project, remarks: project.remarks || '', status})
      .then(() => setProjectState({...projectState, status}))
      .catch(() => {});
  };

  const handleOnUpdate = (updatedProject: ProjectAttr) =>
    setProjectState({...updatedProject});

  return (
    <tr>
      <td>{projectState.id}</td>
      <td>{projectState.name}</td>
      <td>{projectState.code}</td>
      <td>{projectState.location}</td>
      <td>{projectState.estimatedCost}</td>
      <td
        className={classNames(
          STATUS_COLORS[projectState.status],
          'font-weight-bold'
        )}
      >
        {projectState.status}
      </td>
      <td>
        <ButtonGroup>
          <ProjectUpdateButton
            project={projectState}
            onUpdate={handleOnUpdate}
          />
          {projectState.status === 'active' && (
            <Button
              aria-label="mark as inactive"
              title="mark as inactive"
              variant="danger"
              size="sm"
              onClick={() => toggleStatus('inactive')}
            >
              <FaTimes />
            </Button>
          )}
          {projectState.status === 'inactive' && (
            <Button
              aria-label="mark as active"
              title="mark as active"
              variant="success"
              size="sm"
              onClick={() => toggleStatus('active')}
            >
              <FaCheck />
            </Button>
          )}
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ProjectTableRow;
