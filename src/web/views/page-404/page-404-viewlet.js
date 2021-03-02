import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-bootstrap";
import "./page-404.scss";
import {Link} from "react-router-dom";

export default class Page404Viewlet extends React.Component {

    static propTypes = {
        location: PropTypes.any
    }

    render() {
        const {location} = this.props;

        return (
            <Row className={"error-view-404"}>
                <Col className={"p-3"}>
                    <h3>
                        No match found for <code>{location.pathname}</code>
                    </h3>
                    <p>
                        {/*<a href={document.referrer} title={document.referrer}>*/}
                        {/*    &larr; go back{" "}*/}
                        {/*</a>{" "}*/}
                        {/*or*/}
                        <Link  to={"/"}>&larr; go to home</Link>
                    </p>
                </Col>
            </Row>
        );
    }
}
