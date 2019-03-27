import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

export default function GuitarFingerboard() {
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>音的位置</Card.Title>
                <Card.Text>标准调弦</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>弦：{ '3' }</ListGroup.Item>
                <ListGroup.Item>品：{ '4' }</ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Form.Group
                            style={{ 'margin-bottom': 0 }}
                            as={Col}
                            controlId="exampleForm.ControlSelect1"
                        >
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Col><Button variant="primary">刷新</Button></Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};
