import "./elementDetail.scss"
// import { PanelGroup, Panel, Placeholder } from 'rsuite';
import { renderPropertyData } from "./utils";

const ElementDetail = ({ element }: { element: any }) => {

    console.log("=====element=", element)
    return <div className="elementDetail">
        <div className="header">
            <div>{element.group} #{element.id}</div>
            <h4 style={{marginTop: 10}}>{element.properties.desc}</h4>
   


            {/* {
                    cleanedData.outV && cleanedData.inV
                        ? <div className="SelectedDataList mainDetails">
                            {
                                cleanedData.outV
                                    ? <div className={'singleProperty dark'} key={cleanedData.outV}>
                                        <div className={"propertyData"}>
                                            <strong className={"propertyKey"}>source:</strong>
                                            <span
                                                style={{"color": this.props.canvasUtils.getElementColor(cleanedData.outVLabel)}}>
                                          &nbsp;{cleanedData.outV}
                                    </span>
                                        </div>
                                    </div>
                                    : <span></span>
                            }
                            {
                                cleanedData.inV
                                    ? <div className={'singleProperty dark'} key={cleanedData.inV}>
                                        <div className={"propertyData"}>
                                            <strong className={"propertyKey"}>target:</strong>
                                            <span
                                                style={{"color": this.props.canvasUtils.getElementColor(cleanedData.inVLabel)}}>
                                         &nbsp;{cleanedData.inV}
                                    </span>
                                        </div>
                                    </div>
                                    : <span></span>
                            }
                        </div>
                        : <React.Fragment/>
                } */}
            
        </div>
        <div className="body">
            {/* <PanelGroup accordion >
                <Panel header="Properties" defaultExpanded> */}
                {
                        Object.keys(element.properties).length === 0
                            ? <div className={'singleProperty'} key={element.id + "-no-properties-exist"}>
                                <div className={"propertyData"}><span
                                    className={"text-muted"}>No properties exist for this {element.type}</span>
                                </div>
                            </div>
                            : <span></span>
                    }
                    {
                        Object.keys(element.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={element.id + "-" + propKey}>
                                    <div className={"propertyData"}>
                                        <strong className={"propertyKey text-muted"}>{propKey}:</strong>
                                        <div style={{"marginTop": "5px"}} className={"text-muted"}>{renderPropertyData(propKey, element.properties[propKey]) ?
                                            renderPropertyData(propKey, element.properties[propKey])
                                            : <span>&nbsp;</span>}</div>
                                    </div>
                           
                                </div>
                            )
                        })
                    }
                {/* </Panel>
                <Panel header="Relationships">
                    <Placeholder.Paragraph />
                </Panel>
                <Panel header="Display Settings">
                    <Placeholder.Paragraph />
                </Panel>
            </PanelGroup> */}
        </div>
    </div>
}


export default ElementDetail;