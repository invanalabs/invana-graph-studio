import RemoteEngine from "../../layout/remote";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";


export default class CreateVertexViewlet extends RemoteEngine {


    static propTypes = {
        vertexLabel: PropTypes.string,
    }

    render() {
        return (
            <React.Fragment>

                <Form
                    // onSubmit={this.onFormSubmit.bind(this)}
                >
                    <Form.Control name="labelName" value={this.props.vertexLabel} type={"hidden"}/>
                    <Row>
                        <Col md={5} className={"p-0"}>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                                <Form.Text className="text-muted">
                                    We&apos;ll never share your email with anyone else.
                                </Form.Text>
                                <input type="datetime-local" step="1" />
                            </Form.Group>

                        </Col>
                    </Row>
                    <Button variant="outline-primary" size={"md"}>Create</Button>
                </Form>
            </React.Fragment>
        )
    }

}
