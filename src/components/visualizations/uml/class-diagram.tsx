"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { UMLConfig } from "@/data/types";
import { UMLClassNode } from "./uml-node";

interface ClassDiagramProps {
  config: UMLConfig;
  category: "creational" | "structural" | "behavioral";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: Record<string, any> = {
  umlClass: UMLClassNode,
};

export function ClassDiagram({ config, category }: ClassDiagramProps) {
  const categoryColors = {
    creational: "#22d3ee",
    structural: "#a78bfa",
    behavioral: "#4ade80",
  };

  const accentColor = categoryColors[category];

  const initialNodes: Node[] = useMemo(
    () =>
      config.participants.map((p) => ({
        id: p.id,
        type: "umlClass",
        position: p.position,
        data: {
          name: p.name,
          type: p.type,
          stereotype: p.stereotype,
          attributes: p.attributes,
          methods: p.methods,
          accentColor,
        },
      })),
    [config.participants, accentColor]
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      config.relationships.map((r, idx) => {
        const edgeStyles: Record<string, Partial<Edge>> = {
          inheritance: {
            markerEnd: { type: MarkerType.ArrowClosed, color: "#a1a1aa" },
            style: { stroke: "#a1a1aa", strokeWidth: 2 },
          },
          implementation: {
            markerEnd: { type: MarkerType.ArrowClosed, color: "#a1a1aa" },
            style: { stroke: "#a1a1aa", strokeWidth: 2, strokeDasharray: "5,5" },
          },
          composition: {
            markerStart: { type: MarkerType.ArrowClosed, color: accentColor },
            style: { stroke: accentColor, strokeWidth: 2 },
          },
          aggregation: {
            markerStart: { type: MarkerType.Arrow, color: accentColor },
            style: { stroke: accentColor, strokeWidth: 2 },
          },
          association: {
            markerEnd: { type: MarkerType.Arrow, color: "#71717a" },
            style: { stroke: "#71717a", strokeWidth: 1 },
          },
          dependency: {
            markerEnd: { type: MarkerType.Arrow, color: "#71717a" },
            style: { stroke: "#71717a", strokeWidth: 1, strokeDasharray: "3,3" },
          },
        };

        return {
          id: `e${idx}`,
          source: r.from,
          target: r.to,
          label: r.label,
          labelStyle: { fill: "#a1a1aa", fontSize: 12 },
          labelBgStyle: { fill: "#141417", fillOpacity: 0.8 },
          ...edgeStyles[r.type],
        };
      }),
    [config.relationships, accentColor]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-border bg-[#0d0d0e]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#27272a" gap={20} size={1} />
        <Controls
          className="!bg-surface !border-border !rounded-lg"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
