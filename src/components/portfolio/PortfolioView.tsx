import {Col, Container, Row} from 'react-bootstrap';

import {ProjectAttr, useGetAllProjects} from '../../Api';
import {useRootState} from '../../store';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import MyProfileCard from '../profile/MyProfileCard';
import ProjectCard from '../project/ProjectCard';

const PortfolioView = () => {
  const {me} = useRootState(state => state.profile);
  const {data, loading, error} = useGetAllProjects({});

  const renderProjects = (items: ProjectAttr[]) =>
    items.map((item, i) => {
      return <ProjectCard key={i} project={item} />;
    });

  return (
    <>
      <Container>
        <Row>
          <Col md={5} lg={4} className="mb-3 m-0">
            {me && <MyProfileCard profile={me} />}
          </Col>
          <Col className="mb-3 m-0">
            {loading && <Loading />}
            {!loading && data && renderProjects(data)}
            {error && (
              <ErrorInfo>
                unable to get assigned properties at this moment
              </ErrorInfo>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PortfolioView;
