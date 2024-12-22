import React, { useCallback, useState } from 'react';
import {motion} from 'motion/react'
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

const [toggleBar, setToggleBar] = useState(false)
const toggle = () => {
  setToggleBar(!toggleBar)
}

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
      onClick={() => {setToggleBar(false)}}
        colorMode='dark'
        nodeTypes={nodeTypes}
      
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background variant="lines" gap={50} size={1} />
      </ReactFlow>

      <div className="toggleBarContainer">
        {!toggleBar && (
          <motion.button whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} className="arrow" onClick={toggle}><p> &lt; </p></motion.button>
        ) 
      }
      </div>
        <motion.div animate={{width: (toggleBar) ? '30%' : '0%'}}className="toggleBarContainer">
         <motion.div animate={{width: (toggleBar) ? '100%' : '0%'}} className="addSection">
            <div className='sidebarHeader'> Nodes</div>
          </motion.div>
      </motion.div>

    </div>
    
  );
}