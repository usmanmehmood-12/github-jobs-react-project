import React, { useState } from 'react'
import { Badge, Button, Card, Collapse } from 'react-bootstrap'

function Job({ job }) {
    const [open, setOpen] = useState(false)

    return (
        <Card className='mb-3'>
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {job.title} - <span className='text-muted font-weight-light'>{job.company_name}</span>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>
                            {new Date(job.publication_date).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.job_type}</Badge>
                        <Badge variant="secondary">{job.candidate_required_location}</Badge>
                        <div>
                            <a href={job.url}>{job.url} </a>
                        </div>
                    </div>
                    <img alt={job.company_name} height="50" src={job.company_logo} />
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant='primary'>{!open ? 'View Details' : 'Hide Details'}</Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className='mt-4'>
                        {/* <ReactMarkdown>
                            {job.description}
                        </ReactMarkdown> */}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default Job