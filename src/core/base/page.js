/*
To create new pages with full header, left nav etc ui components
 */
import React from "react";
import Header from "./header";
import LeftNav from "./left-nav";
import GremlinHeadlessComponent from "./gremlin";
import LearnFlyOut from "../components/learn";
import FlyOutUI from "../ui/flyout";
import {redirectToConnectIfNeeded} from "../utils";
import HistoryFlyOut from "../components/history";
import SettingsFlyOut from "../ui/settings";

export default class PageComponentBase extends GremlinHeadlessComponent {


    responseSessions = []; // responses from all the queries

    constructor(props) {
        super(props);
        this.state = {
            canvasQuery: null,
            canvasType: "graph",
            leftFlyOutName: null,
            rightFlyOutName: null,
            centerModalName: "welcome"
        }
    }


    setLeftFlyOut(leftFlyOutName) {
        this.setState({
            leftFlyOutName: leftFlyOutName
        })
    }

    setRightFlyOut(leftFlyOutName) {
        this.setState({
            rightFlyOutName: leftFlyOutName
        })
    }

    onLeftFlyOutClose() {
        this.setState({
            leftFlyOutName: null
        })
    }

    onRightFlyOutClose() {
        this.setState({
            rightFlyOutName: null
        })
    }

    onCenterModalClose() {
        this.setState({
            centerModalName: null
        })
    }

    setCenterModal(modalName) {
        this.setState({
            centerModalName: modalName
        })
    }

    processResponse(responses) {
        this.responseSessions = this.responseSessions.concat(responses);
        console.log("responseSessions", this.responseSessions);
        this.setState({
            responses: this.responseSessions,
            shallReRenderD3Canvas: true
        })
    }

    getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("query");
    }

    componentDidMount() {
        redirectToConnectIfNeeded();
        super.componentDidMount();
        setTimeout(() => this.loadQueryFromUrl(), 300);
    }

    loadQueryFromUrl() {
        const query = this.getQueryFromUrl();
        if (query && query !== "null") {
            this.makeQuery(query, true);
        }
    }

    onQuerySubmit(query) {
        console.log("Query is " + query);
        this.makeQuery(query, true);
    }

    onErrorMessageFlyoutClose() {
        this.setState({
            "errorMessage": null
        })
    }

    switchCanvasTo(canvasType) {
        this.setState({
            canvasType: canvasType
        })
    }


    render() {
        const superRender = super.render();
        return (
            <div>
                <Header canvasQuery={this.state.canvasQuery}
                        switchCanvasTo={this.switchCanvasTo.bind(this)}
                        setRightFlyOut={this.setRightFlyOut.bind(this)}
                        setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                        onQuerySubmit={this.onQuerySubmit.bind(this)}/>


                {
                    (this.state.rightFlyOutName === "learn") ?
                        <LearnFlyOut
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    this.state.errorMessage ?
                        <FlyOutUI position={"bottom"}
                                  display={this.state.errorMessage ? "block" : "none"}
                                  title={"Query failed(" + this.state.errorMessage.code + "): " + this.state.errorMessage.message}
                                  isWarning={true}
                                  padding={false}
                                  onClose={this.onErrorMessageFlyoutClose.bind(this)}
                        >
                            <div className={"errorMessage"}>
                                <pre>{JSON.stringify(this.state.errorMessage, null, 4)}</pre>
                            </div>
                        </FlyOutUI> : <span></span>
                }
                {superRender}
                {
                    (this.state.leftFlyOutName === "history") ?
                        <HistoryFlyOut onClose={this.onLeftFlyOutClose.bind(this)}/>
                        : <span></span>
                }

                {
                    (this.state.leftFlyOutName === "settings") ?
                        <SettingsFlyOut onClose={this.onLeftFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                <LeftNav
                    setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                    setCenterModal={this.setCenterModal.bind(this)}
                />

            </div>
        )
    }
}
