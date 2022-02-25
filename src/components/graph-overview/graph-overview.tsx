/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import {
    Nav, Panel, Navbar, Loader, Badge, Tree, Whisper,
    Popover, Table
} from "rsuite";
import ReloadIcon from '@rsuite/icons/Reload';
import {useQuery} from "@apollo/client";
import {GET_SCHEMA_QUERY} from "../../queries/modeller";
import NetworkErrorUI from "../networkError";
import OneColumnIcon from '@rsuite/icons/OneColumn';
// import A from '@rsuite/icons/ArowBack';
import ColumnsIcon from '@rsuite/icons/Columns';
import GridIcon from '@rsuite/icons/Grid';
import PcIcon from '@rsuite/icons/Pc';
import MinusIcon from '@rsuite/icons/Minus';
import "./graph-overview.scss";
import {ItemDataType} from "rsuite/esm/@types/common";

const styles = {width: "280px", "backgroundColor": "white", "padding": 0}


const createIndexId = (name: string) => "indexes---" + name;
const createPropertiesId = (name: string) => "properties---" + name;
const createNodePropertyId = (labelName: string, propertyName: string) => "property---" + labelName + "---" + propertyName;
const createDisplaySettingsId = (labelName: string) => "display-settings---" + labelName;

const createPropertiesNotFoundId = (labelName: string) => "property-not-found---" + labelName;


function convert2Tree(data: Array<any>, labelType: "node" | "relation") {
    console.log("convert2Tree", data)
    // let __data = [];
    const __data: Array<any> = data.map((item: any, index: any) => {
        let itemData: ItemDataType = {
            label: item.name,
            value: item.name + index.toString(),
            children: [
                {
                    label: "properties",
                    value: createPropertiesId(item.name),
                    children: (
                        item.properties.length ?
                            item.properties.map((property: any) => {
                                return {
                                    label: property.name + ":" + property.type,
                                    value: createNodePropertyId(item.name, property.name)
                                };
                            }) : [
                                {
                                    label: "No properties found",
                                    value: createPropertiesNotFoundId(item.name)
                                }
                            ]
                    )
                },
                {
                    label: "indexes",
                    value: createIndexId(item.name),
                    children: []
                },
                {
                    label: "display settings",
                    value: createDisplaySettingsId(item.name),
                    children: []
                }
            ]
        }
        if (labelType === "node") {
            // @ts-ignore
            itemData.children.push({
                label: "partitioned : " + item.partitioned,
                value: "other-option---partitioned---" + item.name,
                // children: []
            })
            // @ts-ignore
            itemData.children.push({
                label: "static : " + item.static,
                value: "other-option---static---" + item.name,
                // children: []
            })
        } else if (labelType === "relation") {
            // @ts-ignore
            itemData.children.push({
                label: "directed : " + item.directed,
                value: "other-option---directed---" + item.directed,
                // children: []
            })
            // @ts-ignore
            itemData.children.push({
                label: "unidirected : " + item.unidirected,
                value: "other-option---unidirected---" + item.unidirected,
                // children: []
            })
        }
        return itemData;
    })
    return __data;
}


interface propertyDataTypeInterface {
    cardinality: string,
    name: string,
    type: string,

}

interface PropertySpeakerProps {
    title: any,
    propertyDataType: propertyDataTypeInterface
}

//
const convertDict2KeyValues = (propertyDataType: any) => Object.keys(propertyDataType).map((propertyKey: any) => {
    return {
        key: propertyKey,
        value: propertyDataType[propertyKey]
    }
})

// eslint-disable-next-line react/display-name
const PropertySpeaker = React.forwardRef<HTMLInputElement, PropertySpeakerProps>(
    (props, ref) => {
        // eslint-disable-next-line react/prop-types
        let propertyDataType = props.propertyDataType;
        return (
            <Popover ref={ref}  {...props}>
                <Table
                    // wordWrap
                    headerHeight={0}
                    rowHeight={30}
                    width={320}
                    height={150}
                    data={convertDict2KeyValues(propertyDataType)}
                >
                    <Table.Column width={100}>
                        <Table.HeaderCell>key</Table.HeaderCell>
                        <Table.Cell dataKey="key" style={{padding: 5}}/>
                    </Table.Column>
                    <Table.Column width={220}>
                        <Table.HeaderCell>value</Table.HeaderCell>
                        <Table.Cell dataKey="value" style={{padding: 5}}/>
                    </Table.Column>

                </Table>
            </Popover>
        )
    })

const renderTreeNode = (nodeData: any,
                        labelType: "node" | "relation",
                        getPropertyData: any) => {
    const labelIcon = (labelType == "node") ? <OneColumnIcon/> : <MinusIcon/>
    if (nodeData.label === "properties") {
        return (<span><ColumnsIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "indexes") {
        return (<span><GridIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "display settings") {
        return (<span><PcIcon/> {nodeData.label}</span>)
    } else { // @ts-ignore
        if (nodeData.value.startsWith("property---")) {
            const label: string = nodeData.label.split(":")[0]
            return (<Whisper
                placement="right"
                speaker={<PropertySpeaker
                    title={nodeData.label}
                    propertyDataType={getPropertyData(label)}
                />}
                trigger="click">
                <span> {nodeData.label}</span>
            </Whisper>)
        } else if (nodeData.value.startsWith("property-not-found---")) {
            return (<span style={{color: "#bbb"}}> {nodeData.label}</span>)
        } else if (nodeData.value.startsWith("other-option---")) {
            return (<span> {nodeData.label}</span>)
        } else {
            return (<span> {labelIcon} {nodeData.label} </span>);
        }
    }

}


const GraphOverview = () => {
    const [activeTab, setActiveTab] = React.useState("node-label");
    const {loading, error, data, refetch} = useQuery(GET_SCHEMA_QUERY)
    if (error) return <NetworkErrorUI error={error}/>;
    if (loading) return <Loader backdrop content="Fetching data ..." vertical/>


    function createPropertyDatTypes(d: any) {
        let propertyDataTypes: any = {}
        d.getAllVertexModels.map((propertyType: any) => {
            propertyType.properties.map((property: any) => {
                propertyDataTypes[property.name] = property
            })
        })
        d.getAllEdgesModels.map((propertyType: any) => {
            propertyType.properties.map((property: any) => {
                propertyDataTypes[property.name] = property
            })
        })
        return propertyDataTypes;
    }

    const propertyDataTypes: any = createPropertyDatTypes(data)

    function getPropertyData(propertyName: string) {
        return propertyDataTypes[propertyName];
    }

    return (
        <Panel className={"graph-overview"} header={<div> Graph Schema Model </div>} bordered style={styles}>
            <Navbar style={{backgroundColor: "transparent", borderBottom: "1px solid #ccc"}}>
                <Nav activeKey={activeTab}>
                    <Nav.Item eventKey="node-label" onClick={() => setActiveTab("node-label")}>
                        Nodes <Badge content={data.getAllVertexModels.length} color={"cyan"}
                                     style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                    <Nav.Item eventKey="relationship-label" onClick={() => setActiveTab("relationship-label")}>
                        Relations <Badge content={data.getAllEdgesModels.length} color={"cyan"}
                                         style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                </Nav>,
                <Nav pullRight>
                    <Nav.Item eventKey="refresh" onClick={() => refetch()} icon={<ReloadIcon/>}/>
                </Nav>
            </Navbar>
            {activeTab === "node-label" ? (
                <Tree data={convert2Tree(data.getAllVertexModels, "node")}
                      showIndentLine={true}
                      height={document.documentElement.clientHeight - 190}
                      renderTreeNode={(nodeData) => renderTreeNode(nodeData, "node", getPropertyData)}
                />
            ) : <span/>}
            {activeTab === "relationship-label" ? (
                <Tree data={convert2Tree(data.getAllEdgesModels, "relation")}
                      height={document.documentElement.clientHeight - 190}
                      showIndentLine={true}
                      renderTreeNode={(nodeData) => renderTreeNode(nodeData, "relation", getPropertyData)}

                />
            ) : <span/>}


        </Panel>
    )
}

export default GraphOverview;