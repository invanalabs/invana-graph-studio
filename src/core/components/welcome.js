import React from "react";
import Modal from "../ui/modal";

export default class Welcome extends React.Component {

    static defaultProps = {
        onClose: console.error("onClose prop not set for <Welcome> component")
    }

    render() {
        return (
            <Modal title={"Welcome to Graph Explorer"} size={"lg"} onClose={this.props.onClose}>
                <div className={"p-10"}>
                    <p>A data visualiser for graphs and tables. </p>
                    <ul className={"vertical list"}>
                        <li>
                            <a onClick={() => alert("not implemented yet.")}>1. Create sample data</a>
                        </li>
                        <li>
                            <a onClick={() => this.props.makeQuery("g.V().limit(10).toList();", true)}>2. Your first
                                graph query - g.V().limit(10).toList();</a>
                        </li>

                    </ul>
                </div>
            </Modal>
        )
    }
}
