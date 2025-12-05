"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface UMLClassData {
  name: string;
  type: "class" | "interface" | "abstract";
  stereotype?: string;
  attributes: string[];
  methods: string[];
  accentColor: string;
}

interface UMLNodeProps {
  data: UMLClassData;
}

export const UMLClassNode = memo(function UMLClassNode({ data }: UMLNodeProps) {
  const nodeData = data;
  const { name, type, stereotype, attributes, methods, accentColor } = nodeData;

  const getStereotype = () => {
    if (stereotype) return `«${stereotype}»`;
    if (type === "interface") return "«interface»";
    if (type === "abstract") return "«abstract»";
    return null;
  };

  const stereo = getStereotype();

  return (
    <div
      className="min-w-[180px] bg-surface border-2 rounded-lg overflow-hidden font-mono text-xs"
      style={{ borderColor: accentColor }}
    >
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0" />

      {/* Class name section */}
      <div
        className="px-3 py-2 text-center border-b border-border"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        {stereo && (
          <div className="text-text-muted text-[10px] mb-0.5">{stereo}</div>
        )}
        <div
          className="font-bold"
          style={{
            color: accentColor,
            fontStyle: type === "abstract" ? "italic" : "normal",
          }}
        >
          {name}
        </div>
      </div>

      {/* Attributes section */}
      <div className="px-3 py-2 border-b border-border min-h-[24px]">
        {attributes.length > 0 ? (
          attributes.map((attr, idx) => (
            <div key={idx} className="text-text-secondary">
              {attr}
            </div>
          ))
        ) : (
          <div className="text-text-muted italic">no attributes</div>
        )}
      </div>

      {/* Methods section */}
      <div className="px-3 py-2 min-h-[24px]">
        {methods.length > 0 ? (
          methods.map((method, idx) => (
            <div key={idx} className="text-text-secondary">
              {method}
            </div>
          ))
        ) : (
          <div className="text-text-muted italic">no methods</div>
        )}
      </div>
    </div>
  );
});
