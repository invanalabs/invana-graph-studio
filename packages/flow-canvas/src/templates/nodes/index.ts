import { NodeTypes } from "@xyflow/react";
import GenericNode from "./GenericNode";
import CommentNode from "./CommentNode";
import LabeledGroupNode from "./LabeledGroupNode";
import DataTypeFieldsNode from "./DataTypeFieldsNode"


export const defaultNodeTypes: NodeTypes = {
    GenericNode: GenericNode,
    CommentNode: CommentNode,
    LabeledGroupNode: LabeledGroupNode,
    DataTypeFieldsNode: DataTypeFieldsNode
};