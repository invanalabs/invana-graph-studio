import React from 'react';
import DefaultLayout from "../../layout/default";
import {Form, FormControl, InputGroup, Nav, Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight,
    faCircle, faEdit, faEllipsisV,
    faList,
    faPlus, faProjectDiagram,
    faTable, faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import MainContent from "../../ui-components/main-content";
import MenuComponent from "../../ui-components/menu";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {VERTICES_EXAMPLE_DATA} from "../../../example-data/data";
import TableInterface from "../../interface/tables";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


export default class VertexDetailView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: 120312,
            // renderType: "table", // ["table", "list", "graph"]
            elementData: VERTICES_EXAMPLE_DATA[0]
        }

    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>

                <Row>
                    <Sidebar>
                        <DataSidebarViewlet/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <Row>
                            <Col size={"12"} className={"p-2 bg-light"}>
                                 <h2 style={{"fontSize": "1.3rem"}}
                                    className={" mb-0 pb-0 mr-3 mt-2"}>{this.props.match.params.vertexId}</h2>

                                <MenuComponent className={"p-1"}>
                                    <Nav className="mr-auto">
                                        <Nav.Item>

                                             <strong>id:</strong> {this.props.match.params.vertexId}
                                        </Nav.Item>


                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item>
                                            <Button variant="outline-secondary" className={"mr-1"} size={"sm"}>
                                                <FontAwesomeIcon icon={faEdit}/> edit
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="outline-secondary" className={"mr-1"} size={"sm"}>
                                                <FontAwesomeIcon icon={faTrashAlt}/> delete
                                            </Button>
                                        </Nav.Item>
                                    </Nav>
                                </MenuComponent>
                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
