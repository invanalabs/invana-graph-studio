import React from "react";
import PropTypes from "prop-types";
import InvanaEngineHTTPConnector from "../../connector/invana-engine";
import DefaultWebSocketConnector from "../../connector/websocket";
import DefaultHTTPConnector from "../../connector/http";
import GremlinQueryManager from "../../query-builder/gremlin";
import InvanaEngineQueryManager from "../../query-builder/invana-engine";
import {getDataFromLocalStorage, setDataToLocalStorage} from "../utils";
import {HISTORY_SETTINGS, STUDIO_SETTINGS} from "../../settings";
import InvanaEngineDeSerializer from "../../serializers/invana-engine";
import GraphSONDeSerializer from "../../serializers/graphson-v3";
import InMemoryDataStore from "../../core/data-store";


export default class RemoteEngine extends React.Component {

    /*



    export default class ExampleView extends RemoteEngine {


        componentDidMount() {
            const verticesStateQuery = this.connector.requestBuilder.getVerticesLabelStats();
            const edgesStatsQuery = this.connector.requestBuilder.getEdgesLabelStats();
            const queryPayload = this.connector.requestBuilder.combineQueries(verticesStateQuery, edgesStatsQuery);
            this.makeQuery(queryPayload);

        }

        processResponse(response) {
            const lastResponse = response.getResponseResult();
            if (lastResponse) {
                this.setState({
                    verticesStats: response.getResponseResult(this.connector.requestBuilder.getVerticesLabelStats().queryKey),
                    edgeStats: response.getResponseResult(this.connector.requestBuilder.getEdgesLabelStats().queryKey),
                })
            }
        }



        setShowQueryConsole() // to show the console
        setQueryStringFromQueryObject()




    }





     */

    static defaultProps = {
        connectionUrl: STUDIO_SETTINGS.CONNECTION_URL,
        graphEngineName: STUDIO_SETTINGS.GRAPH_ENGINE_NAME,
    }
    static propTypes = {
        connectionUrl: PropTypes.string,
        graphEngineName: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            query: null,
            queryObject: null,

            isConnected2Gremlin: null,
            isStreaming: null,
            isQuerying: null,
            statusCode: null,
            statusMessage: null,

            showQueryConsole: false,


            // responses: [],
            // vertices: [],
            // edges: []
        }

        this.dataStore = new InMemoryDataStore();

    }


    setShowQueryConsole(status) {
        this.setState({showQueryConsole: status});
    }

    startNewQueryInConsole(queryString) {
        console.log("====startNewQueryInConsole", queryString);
        this.setShowQueryConsole(true);
        this.setQueryString(queryString);
    }

    checkIfConnectionUrlIsValid() {
        return !!this.props.connectionUrl;
    }

    checkIfGraphEngineIsValid() {
        return !!this.props.graphEngineName;
    }

    connect() {
        console.log("Connect triggered");
        const protocol = this.getProtocol();
        let connectorCls = null;

        if (this.props.graphEngineName === "invana-engine") {
            connectorCls = InvanaEngineHTTPConnector;
        } else {
            if (protocol === "ws") {
                connectorCls = DefaultWebSocketConnector
            } else {
                connectorCls = DefaultHTTPConnector;
            }
        }
        let requestBuilder = new GremlinQueryManager();

        if (this.checkIfGraphEngineIsValid() && this.props.graphEngineName === "invana-engine") {
            requestBuilder = new InvanaEngineQueryManager();
        }

        return new connectorCls(
            this.props.connectionUrl,
            this.responseEventsCallback.bind(this),
            this.onResponseCallback.bind(this),
            requestBuilder
        );
    }

    setIsStreaming(status) {
        this.setState({isStreaming: status});
    }

    setstatusCode(statusCode) {
        this.setState({statusCode: statusCode});
    }

    setErrorMessage(message) {
        if (message) {
            this.setState({
                errorMessage: message,
                bottomContentName: "error-console"
            })
        } else {
            this.setState({
                errorMessage: null,
                bottomContentName: null
            })
        }
    }

    setIsConnected2Gremlin(status) {
        // this.props.eventHandler({isConnected2Gremlin: status});
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }

    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    eventTranslator(eventName, eventValue) {
        // console.log("===eventName", eventName, eventValue);
        if (eventName === "statusMessage") {
            this.setStatusMessage(eventValue);
        } else if (eventName === "statusCode") {
            this.setstatusCode(eventValue);
        } else if (eventName === "isStreaming") {
            this.setIsStreaming(eventValue);
        } else if (eventName === "errorMessage") {
            this.setErrorMessage(eventValue);
        } else if (eventName === "isConnected") {
            this.setIsConnected2Gremlin(eventValue);
        } else {
            this.setState({eventName: eventValue});
        }
    }


    responseEventsCallback(event) {
        console.log("received event", event);
        for (const [key, value] of Object.entries(event)) {
            this.eventTranslator(key, value)
        }
    }

    onResponseCallback(response) {
        // this.resetLoader(); // updates the status of the ui

        this.setState({isQuerying: false});
        this.processResponse(response);
    }

    addQueryToHistory(query, source) {
        //
        let existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.historyLocalStorageKey, true) || [];

        existingHistory = existingHistory.slice(0, HISTORY_SETTINGS.MAX_HISTORY_COUNT_TO_REMEMBER)
        existingHistory.unshift({
            "query": query,
            "source": source,
            "dt": new Date()
        })
        setDataToLocalStorage(HISTORY_SETTINGS.historyLocalStorageKey, existingHistory);
    }

    setQueryObject(queryObject) {
        this.setState({queryObject: queryObject});
    }

    /*
    {rawQuery(gremlin:"g.V().limit(5).toList()"){id,type,label,properties, inV, inVLabel, outV, outVLabel}}

     */

    setQueryStringFromQueryObject(queryPayload) {
        console.log("===queryPayload", queryPayload);
        if (queryPayload.includes("rawQuery")) {
            const queryString = queryPayload.split('rawQuery(gremlin:"')[1].split('"){id')[0].replaceAll('\\"', '"');
            this.setQueryString(queryString);
        }
    }

    setQueryString(queryString) {
        this.setState({query: queryString});

    }

    makeQuery(queryObj, queryOptions) {

        /*
            queryOptions.source = "internal|console|canvas"
         */

        // console.log("=====queryObj", queryObj);
        // TODO - add logic to wait till server connects.

        if (!queryObj.queryKey) {
            queryObj.queryKey = "rawQuery";
        }
        if (typeof queryOptions === "undefined") {
            queryOptions = {}
        }
        if (typeof queryOptions.source === "undefined") {
            queryOptions.source = "internal";
        }
        if (queryOptions.source) {
            // this.setQueryToUrl(queryObj);
            // this.addQueryToState(queryObj)
            this.addQueryToHistory(queryObj, queryOptions.source)
        } // remove this part from here soon.

        if (queryObj.queryKey) {
            this.setQueryStringFromQueryObject(queryObj.query);
        }
        this.setState({
            statusMessage: "Fetching data...",
            isQuerying: true
        });
        this.setQueryObject(queryObj);

        console.log("makeQuery :::  query", JSON.stringify(queryObj));
        if (queryObj) {
            this.connector.query(queryObj);
        }
    }

    getProtocol() {
        if (this.props.connectionUrl) {
            const _ = new URL(this.props.connectionUrl).protocol;
            return _.includes("ws") ? "ws" : "http";
        } else {
            return null;
        }
    }

    // componentWillUnmount() {
    //     if (this.checkIfConnectionUrlIsValid()) {
    //         this.connector = this.connect();
    //     }
    //     if (this.checkIfGraphEngineIsValid() && this.props.graphEngineName === "invana-engine") {
    //         // this.requestBuilder = new InvanaEngineQueryManager();
    //         this.responseSerializer = new InvanaEngineDeSerializer();
    //     } else {
    //         // this.requestBuilder = new GremlinQueryManager();
    //         this.responseSerializer = new GraphSONDeSerializer();
    //     }
    //     this.dataStore = new InMemoryDataStore();
    // }

    componentDidMount() {
        console.log("gremlin-component componentDidMount")
        if (this.checkIfConnectionUrlIsValid()) {
            this.connector = this.connect();
        }
        if (this.checkIfGraphEngineIsValid() && this.props.graphEngineName === "invana-engine") {
            // this.requestBuilder = new InvanaEngineQueryManager();
            this.responseSerializer = new InvanaEngineDeSerializer();
        } else {
            // this.requestBuilder = new GremlinQueryManager();
            this.responseSerializer = new GraphSONDeSerializer();
        }

    }


}
