import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import useFetchJobs from "./useFetchJobs";

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(99)
  /** Calling usefetchjobs custom hook & destructing values */
  const { jobs, loading, error } = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }
  return (
    <Container className='my-4'>
      <h1 className='mb4'>Remotive Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} totalPages={Math.ceil(jobs.length / jobsPerPage)} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage)
        .map(job => {
          return <Job key={job.id} job={job} />
        })}
      <JobsPagination page={page} totalPages={Math.ceil(jobs.length / jobsPerPage)} setPage={setPage} />
    </Container>
  );
}

export default App;
