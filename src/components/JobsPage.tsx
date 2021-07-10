import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { JobsNavbar } from '../ui/JobsNavbar';
import { JobsTable } from '../ui/JobsTable';
import { JobTableRow } from '../ui/JobTableRow';
import { useEffect, useState } from 'react';
import { Job } from '../models/job';
import { JobController } from './JobController';
import { useTokenQuery } from '../hooks/use-token.query';
import { useJobsQuery } from '../hooks/use-jobs.query';

export function JobsPage() {
  const { data: token } = useTokenQuery();
  const { data: jobs } = useJobsQuery(token);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[] | undefined>(undefined);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredJobs(jobs && [...jobs]);
      return;
    }

    setFilteredJobs(jobs && jobs.filter(j => j.id.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, jobs])

  return (
    <>
      <JobsNavbar onSearchTermChange={s => setSearchTerm(s)} />
      <Container fluid>
        <Row>
          <Col className="p-0">
            <JobsTable>
              {filteredJobs && filteredJobs.map(job => (
                <JobController key={job.id} job={job}>
                  {({job, refresh, start, viewLogs, edit}) => (
                    <JobTableRow job={job} 
                      onRunClick={() => start()} 
                      onRefreshClick={() => refresh()}
                      onViewLogsClick={() => viewLogs()}
                      onEditClick={() => edit()}
                    />
                  )}
                </JobController>
              ))}
            </JobsTable>
          </Col>
        </Row>
      </Container>
    </>
  );
}