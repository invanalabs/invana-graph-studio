import { NodeTypes } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import CommentNode from "./CommentNode";
import { LabeledGroupNode } from "./LabeledGroupNode";


export const defaultNodeTypes: NodeTypes = {
    default: BaseNode,
    CommentNode: CommentNode,
    LabeledGroupNode: LabeledGroupNode
};