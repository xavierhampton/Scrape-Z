import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import './App.css'
import RootNode from './components/RootNode';

const nodeTypes = {
  'RootNode': RootNode,
}

 
const initialNodes = [
  { id: '1', type: 'RootNode', position: { x: 0, y: 0 },},
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }},
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2',}];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        colorMode='dark'
        nodeTypes={nodeTypes}
      
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background variant="cross" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}