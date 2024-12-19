import { NodeTypes } from "@xyflow/react";
import { GenericNode } from "./GenericNode";
import CommentNode from "./CommentNode";
import { LabeledGroupNode } from "./LabeledGroupNode";


export const defaultNodeTypes: NodeTypes = {
    GenericNode: GenericNode,
    CommentNode: CommentNode,
    LabeledGroupNode: LabeledGroupNode
};