import React, {Component} from 'react';
import {DefaultMaxTimeElapsedWarningInSeconds} from "../../config";
import LoadSpinner from "../ui/spinner";
import {StatusMessageComponent} from "../gremlin-connector";
import Footer from "../ui/footer";

export default class ComponentBase extends React.Component {

    constructor(props) {
        super(props);
        this.loaderTimer = React.createRef(); // used for tracking the load timer for the processes.

    }

    state = {
        statusMessage: null,

        isLoading: false,
        loaderElapsedTimer: 0,
        loaderMaxTimeElapsedError: false,
        loadingMessage: null,
        loadingExtraText: null,

    }

    startLoader(message, extraMessage) {
        this.setState({
            loadingMessage: message,
            loadingExtraText: extraMessage,
            isLoading: true,
            loaderElapsedTimer: 0
        })
        this.startLoaderTimer()
    }

    resetLoader() {
        this.setState({
            loadingMessage: null,
            loadingExtraText: null,
            isLoading: false,
            loaderElapsedTimer: null
        })
    }


    updateTimer(timerCount, isMaxTimeElapsed) {
        this.setState({loaderElapsedTimer: timerCount, loaderMaxTimeElapsedError: isMaxTimeElapsed});
    }

    startLoaderTimer() {
        console.log("Timer started")
        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.loaderElapsedTimer);
                if (_this.state.isLoading === false) {
                    clearInterval(timer);
                }
                if (_this.state.loaderElapsedTimer >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(_this.state.loaderElapsedTimer + 1, true);
                } else {
                    _this.updateTimer(_this.state.loaderElapsedTimer + 1, false);
                }
            }
        ), 1000); // check every second.
    }


    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    render() {
        return (
            <Footer>
                <StatusMessageComponent statusMessage={this.state.statusMessage}/>
                <LoadSpinner
                    loadingMessage={this.state.loadingMessage}
                    loadingExtraText={this.state.loadingExtraText}
                    isLoading={this.state.isLoading}
                    showSignout={true}
                    loadTimeCounter={this.state.loaderElapsedTimer}/>
            </Footer>
        )
    }


}
