import {Col, Row} from 'react-bootstrap';
import {BiBuildingHouse} from 'react-icons/bi';
import {ImLocation} from 'react-icons/im';
import {Link} from 'react-router-dom';

import routes from '../../@utils/routes';
import {ProjectAttr} from '../../Api';
import {LabeledCurrency} from '../@ui/LabeledCurrency';
import RoundedPanel from '../@ui/RoundedPanel';

type Props = {
  project: ProjectAttr;
};

const ProjectCard = ({project}: Props) => {
  return (
    <>
      <RoundedPanel className="p-4 mb-3">
        <Row>
          <Col md={8}>
            <Link className="text-underline" to={routes.PROJECT(project.id)}>
              <h4>{project.code}</h4>
            </Link>
            <div>
              <BiBuildingHouse />
              <span className="text-wrap">{project.name}</span>
            </div>
            <div>
              <ImLocation />
              <small className="pl-1 text-muted">{project.location}</small>
            </div>
          </Col>
          <Col md={4}>
            <LabeledCurrency
              label="running cost"
              pill
              variant="primary"
              className="text-right"
              currency={123456}
            />
          </Col>
        </Row>
      </RoundedPanel>
    </>
  );
};

export default ProjectCard;
