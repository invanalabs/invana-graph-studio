import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {getDataFromLocalStorage, removeLambdaFromStorageById} from "../../../utils/localStorage";
import {LAMBDA_SETTINGS} from "../../../settings/lambda";

export default class LambdaSettingsView extends React.Component {

    static defaultProps = {
        // makeQuery: (query) => console.log("makeQuery prop not set to HistoryFlyOut", query),
        // connector: null,
        startNewQueryInConsole: (query) => console.log("startNewQueryInConsole prop not set to HistoryFlyOut", query),
        query: null,
        onClose: PropTypes.func,

    }

    static propTypes = {
        // makeQuery: PropTypes.func,
        // connector: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        query: PropTypes.string,
        onClose: PropTypes.func,
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            showStartCount: 0,
            showEndCount: 5,
            paginationCount: 5
        }
    }

    extractRawQuery(graphQLQuery) {
        return graphQLQuery;
    }

    showNext() {
        this.setState({
            showStartCount: this.state.showStartCount + this.state.paginationCount,
            showEndCount: this.state.showEndCount + this.state.paginationCount,
        })
    }

    showPrev() {
        this.setState({
            showStartCount: this.state.showStartCount - this.state.paginationCount,
            showEndCount: this.state.showEndCount - this.state.paginationCount,
        })
    }


    render() {
        let _this = this;
        let lambdaData = getDataFromLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, true);
        const lambdaDataToShow = lambdaData.slice(this.state.showStartCount, this.state.showEndCount);
        console.log("====lambdaDataToShow", lambdaDataToShow)
        return (
            <div className={" position-absolute  "} style={this.props.style}>
                <div className={"  ml-3 border border-top-0 bg-white"}>

                    <Card className={" border-0 rounded-0"}>
                        <Card.Header className={"bg-secondary text-white pt-2 pb-2 rounded-0"}>
                            <span className={"font-weight-bold"}>λ</span> Lambda Settings
                        </Card.Header>
                        <Card.Body className={"p-0 "}>
                            <div>
                                {lambdaDataToShow.length > 0
                                    ?
                                    <ul className={"list-group  rounded-0"}>
                                        {
                                            lambdaDataToShow.map((lambdaDataItem, i) => {
                                                return (
                                                    <li className={"list-group-item border-bottom p-0"}
                                                        key={i}>
                                                        <h6 className={"font-weight-bold ml-2 mr-2 mt-2 mt-0 mb-0"}>{lambdaDataItem.name}</h6>
                                                        <pre className={" ml-2 mr-2 mt-2 p-3 mt-0 mb-0"}
                                                             style={{"backgroundColor": "#efefef"}}>
                                                            {this.extractRawQuery(lambdaDataItem.query)}
                                                        </pre>
                                                        {/*<pre className={"mb-0"}>{JSON.stringify(lambdaDataItem.query, null, 2)}</pre>*/}

                                                        <div className={"pr-2 pl-2 pt-1 pb-1"}>
                                                            {/*<button className={"btn btn-dark btn-sm  small "}*/}
                                                            {/*        onClick={() => this.props.makeQuery(this.extractRawQuery(lambdaDataItem.query), {source: 'console'})}>*/}
                                                            {/*    Run Again*/}
                                                            {/*</button>*/}
                                                            <button className={"btn btn-link mt-0 " +
                                                            "font-weight-bold btn-sm p-0 display-inline"}
                                                                    onClick={() => this.props.startNewQueryInConsole(this.extractRawQuery(lambdaDataItem.query))}>
                                                                Start Query
                                                            </button>
                                                            <button className={"btn btn-link text-danger mt-0 ml-3 " +
                                                            "font-weight-bold btn-sm p-0 display-inline"}
                                                                    onClick={() => {
                                                                        if (confirm("Are you sure you want to remove this lambda ?")) {
                                                                            removeLambdaFromStorageById(lambdaDataItem.id);
                                                                            _this.setState(_this.state);

                                                                        }

                                                                    }}>
                                                                delete
                                                            </button>
                                                            <small className={"ml-3"}>
                                                                queried at {lambdaDataItem.dt}
                                                            </small>

                                                        </div>

                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    : <p className={"p-3 text-muted"}>No Gremlin lambdas were saved!.</p>
                                }
                            </div>
                            <div>
                                <Button variant={"outline-secondary mt-2 mr-2"} type={"button"}
                                        className={"pt-0 pb-0 pl-2 pr-2 rounded-0"}
                                        onClick={() => this.props.onClose()}>close
                                </Button>
                                {
                                    this.state.showStartCount > 0 ?
                                        <Button variant={"outline-secondary mt-2"} type={"button"}
                                                className={"pt-0 pb-0 pl-2 pr-2 rounded-0"}
                                                onClick={() => this.showPrev()}>prev
                                        </Button>
                                        : <React.Fragment/>
                                }

                                {
                                    lambdaData.length > this.state.showEndCount
                                        ? <Button variant={"outline-secondary mt-2"} type={"button"}
                                                  className={"pt-0 pb-0 pl-2 pr-2 rounded-0"}
                                                  onClick={() => this.showNext()}>next </Button>
                                        : <React.Fragment/>
                                }

                                <span className={"float-right text-muted small"}>
                            showing {this.state.showStartCount} to {this.state.showEndCount} of {lambdaData.length}
                        </span>


                            </div>


                        </Card.Body>
                    </Card>

                </div>
            </div>
        )
    }
}
