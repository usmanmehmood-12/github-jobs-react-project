import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

function SearchForm({ params, onParamChange }) {
    console.log('params: ', params)

    return (

        <Form className="mb-4">
            <Row >
                <Col>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" />
                </Col>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" />
                </Col>
            </Row>
        </Form >
    )
}

export default SearchForm