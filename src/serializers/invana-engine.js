import DeSerializerBase from "./base";


export default class InvanaEngineDeSerializer extends DeSerializerBase {


    processItem(item) {
        return item;
    }

    convertEdge2Json(edg) {
        edg.source = edg.outV;
        edg.target = edg.inV;
        return edg;
    }

    separateVerticesAndEdges(data, ignoreManagement) {
        if (typeof ignoreManagement === "undefined") {
            ignoreManagement = true;
        }
        let vertices = [];
        let edges = [];
        if (!data) {
            data = []
        }
        let _this = this;
        data.forEach(function (d) {
            if (ignoreManagement) {
                if (d.type === "g:Vertex" && d.label !== "InvanaManagement") {
                    vertices.push(d);
                } else if (d.type === "g:Edge" && d.label !== "InvanaManagement") {
                    edges.push(_this.convertEdge2Json(d));
                }
            } else {
                if (d.type === "g:Vertex") {
                    vertices.push(d);
                } else if (d.type === "g:Edge") {
                    edges.push(_this.convertEdge2Json(d));
                }
            }
        });


        return {"nodes": vertices, "links": edges};
    }

    convertList2Json(items) {
        return items;
    }

}

