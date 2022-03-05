import {ChangeEvent, useState} from 'react';
import {Button, Col, FormControl, InputGroup, Row} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';

import {useGetAllProjects} from '../../../Api';
import ErrorInfo from '../../@ui/ErrorInfo';
import RoundedPanel from '../../@ui/RoundedPanel';
import {Table} from '../../@ui/Table';
import ProjectCreateButton from './ProjectCreateButton';
import ProjectTableRow from './ProjectTableRow';

const ProjectsView = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | undefined>(
    undefined
  );
  const {data, loading, error, refetch} = useGetAllProjects({
    debounce: 300,
    queryParams: {
      search: searchCriteria,
    },
  });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(e.currentTarget.value);
  };
  return (
    <>
      <RoundedPanel className="p-0 m-auto">
        <Table
          loading={loading}
          headers={[
            'id',
            'name',
            'code',
            'location',
            'estimated cost',
            'status',
            'action',
          ]}
          renderFooterContent={
            <>
              {error && (
                <div className="m-2 pb-2">
                  <ErrorInfo>{error.message}</ErrorInfo>
                </div>
              )}
            </>
          }
          renderHeaderContent={
            <Row>
              <Col sm={12} md={6}>
                <h4>Projects</h4>
              </Col>
              <Col className="text-right">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="search..."
                    onChange={handleOnChange}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="secondary"
                      aria-label="search user"
                      onClick={() => refetch()}
                    >
                      <FaSearch />
                    </Button>
                    <ProjectCreateButton onCreate={() => refetch()} />
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
          }
        >
          {data && !loading && !error && (
            <tbody>
              {data.map(project => {
                return <ProjectTableRow project={project} key={project.id} />;
              })}
            </tbody>
          )}
        </Table>
      </RoundedPanel>
    </>
  );
};

export default ProjectsView;
