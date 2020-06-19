import React from "react";
import ConnectionIndicatorComponent from "./indicator";



export default class StatusMessageComponent extends React.Component {
    /*
    This component will show the status of the gremlin connection. ie, shows

    statusMessage
    Connection status Indicator

     */
    render() {
        return (
            <div className={"statusMessage"}>
                {this.props.statusMessage || ""}
            </div>
        );
    }
}
