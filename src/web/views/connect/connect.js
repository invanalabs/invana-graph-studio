import React from 'react';
import DefaultLayout from "../../layout/default";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faTimesCircle, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {Button, Col, Form, Row} from "react-bootstrap";
import {STUDIO_SETTINGS, STUDIO_CONNECT_CONSTANTS} from "../../../settings";
import {setDataToLocalStorage} from "../../utils";
import "./connect.scss";
import PropTypes from "prop-types";

export default class ConnectView extends React.Component {

    static propTypes = {
        connectionUrl: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            showExtraHeaderOptions: false,
            extraHeadersCount: 1
        }
    }

    addNewHeader() {
        console.log("addNewHeader")
        this.setState({extraHeadersCount: this.state.extraHeadersCount + 1})
    }

    removeHeader() {
        this.setState({extraHeadersCount: this.state.extraHeadersCount - 1})

    }

    checkIfSecureProtocol(url) {
        const protocol = new URL(url).protocol;
        return protocol === "https:" || protocol === "wss:";
    }

    getErrorFromUrlString() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('error');
    }

    getHeaders() {

        let headers = {};
        document.querySelectorAll(".headerItem").forEach((elem) => {
            const key = elem.querySelector(".headerKey").value;
            const val = elem.querySelector(".headerValue").value;
            console.log("======", key, val);
            headers[key] = val;
        })
        return headers;
    }


    onFormSubmit(e) {
        console.log("onFormSubmit", e);
        const connectionUrl = e.target.connectionUrl.value;
        const graphEngineName = e.target.graphEngineName.value;
        console.log("connectionUrl", connectionUrl)
        // const isHttps = new URL(window.location.href).protocol === "https:" || new URL(window.location.href).protocol === "wss:";
        e.preventDefault();

        if (!connectionUrl) {
            alert("Invalid connection string");
        } else if (this.checkIfSecureProtocol(window.location.href) && !this.checkIfSecureProtocol(connectionUrl)) {
            alert("Your connection string is not secure. You can only use https or wss connection string " +
                "when you are using Invana Studio via https connection.")
        } else if (connectionUrl) {
            const headers = this.getHeaders();
            setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL, connectionUrl);
            setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.HTTP_HEADERS, headers);
            setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.GRAPH_ENGINE_NAME, graphEngineName);
            window.location.href = "/";
        }
    }

    componentDidMount() {

        // document.addEventListener('input', (e) => {
        //
        //     if (e.target.getAttribute('name') === "graphEngineName")
        //         console.log(e.target.value)
        // })

        // function updateInputPlaceholder(event) {
        //     console.log("event", event.target.id);
        //     const el = document.querySelector("[name=connectionUrl]");
        //     if (event.target.id === "gremlinEngine") {
        //         el.placeholder = "http://localhost:8182/gremlin";
        //     } else {
        //         el.placeholder = "http://localhost:8000/graphql";
        //     }
        // }
        //
        // document.querySelectorAll("input[name='graphEngineName']").forEach((input) => {
        //     input.addEventListener('change', updateInputPlaceholder);
        // });

        const errorMessage = this.getErrorFromUrlString();
        this.setErrorMessage(errorMessage);

    }

    setErrorMessage(errorMessage) {
        this.setState({errorMessage});
    }

    toggleMoreOptions() {

        // const errorMessage = "To provide custom headers, " +
        //     "you need to provide connection string" +
        //     " with http(s) protocol.";
        // const connectionUrl = document.querySelector('[name="connectionUrl"]').value;
        // if (!connectionUrl) {
        //     alert(errorMessage);
        //     return
        // }
        // const isHttp = new URL(connectionUrl).protocol.includes("http");
        // if (isHttp) {
        this.setState({showExtraHeaderOptions: !this.state.showExtraHeaderOptions})
        // } else {
        //     alert(errorMessage);
        // }

    }

    render() {

        const headersArrayTemp = Array.from({length: this.state.extraHeadersCount}, (_, index) => index + 1);

        // console.log("this.props.location", this.props.location)
        return (<DefaultLayout {...this.props}
                               setModalContentName={() => alert("You need to connect to a graph engine")}

        >


            <div className={"connect"} style={{
                paddingTop: "18.5%",
                marginLeft: "1rem"
            }}>
                <Row className={"pl-3"}>
                    <Col md={"1"} className={""} style={{"width": "4.5rem", "flex": "none"}}>
                        <FontAwesomeIcon icon={faUserAstronaut}
                                         className={"mt-2"}
                                         style={{"fontSize": "4rem"}}/>
                    </Col>
                    <Col md={"3"}>
                        {/*<p className={"mb-0 font-weight-bold"}>INVANA</p>*/}
                        <h1 className={"pb-0 mb-0 mt-1"}>Invana Studio <small>({STUDIO_SETTINGS.VERSION})</small></h1>
                        <p>{STUDIO_SETTINGS.ABOUT_TEXT}</p>
                    </Col>
                </Row>
            </div>

            <Row className={"pl-3 connect"}>
                <Col md={"6"}>
                    <Card style={{marginTop: '1rem', width: "450px"}} className=" m-3">
                        <Card.Header>Connect to Invana Engine</Card.Header>
                        <Card.Body>
                            <Form inline onSubmit={this.onFormSubmit.bind(this)}>

                                <Form.Control
                                    className="mb-2 mr-2 mr-sm-2"
                                    name="connectionUrl"
                                    placeholder="http://localhost:8000/graphql"
                                    style={{width: "320px"}}
                                />
                                <Form.Control name="graphEngineName" value={"invana-engine"} type={"hidden"}/>


                                <Button type="submit" variant={"outline-primary"} className={""}>
                                    Connect
                                </Button>
                                <p>
                                    <button className={"extra-headers-btn small"} type={"button"}
                                            onClick={this.toggleMoreOptions.bind(this)}>
                                        http headers <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </p>
                                {
                                    this.state.showExtraHeaderOptions
                                        ?
                                        <div className={"headersList"}>

                                            <h6 className={"small font-weight-bold"}>Extra HTTP Headers</h6>
                                            {
                                                headersArrayTemp.map((headerItem) => {
                                                    return <div key={headerItem}
                                                                className={"headerItem headerItem-" + headerItem}>
                                                        <input type="text"
                                                               className={"headerKey"}
                                                               placeholder={"header key"}
                                                               name={"headerKey"}
                                                        />
                                                        <input type="text"
                                                               className={"headerValue"}
                                                               placeholder={"header value"}
                                                               name={"headerValue"}
                                                        />
                                                        <Button type={"button"} variant={"bg-link"}
                                                                onClick={this.removeHeader.bind(this)}>
                                                            <FontAwesomeIcon icon={faTimesCircle}/>
                                                        </Button>

                                                    </div>

                                                })
                                            }
                                            <p>
                                                <Button type={"button"} variant={"outline-secondary"} size={"sm"}
                                                        className={"mt-2"}
                                                        onClick={this.addNewHeader.bind(this)}> + add new header
                                                </Button>
                                            </p>
                                        </div>
                                        : <span></span>
                                }
                            </Form>
                            <p>
                                <a target={"_new"} className={"mr-2"} href={STUDIO_SETTINGS.SETUP_INSTRUCTIONS_URL}>setup instructions</a> |
                                <a target={"_new"} className={"mr-2"} href={STUDIO_SETTINGS.SUPPORT_URL}>support</a> |
                                <a target={"_new"} className={"mr-2"} href={STUDIO_SETTINGS.DEMO_VIDEO_URL}>watch demo</a>
                            </p>
                            {
                                this.state.errorMessage ? (
                                    <p>{this.state.setErrorMessage}</p>
                                ) : (<span></span>)
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </DefaultLayout>)
    }
}
