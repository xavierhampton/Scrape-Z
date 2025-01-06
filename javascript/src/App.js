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
  MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './App.css'
import RootNode from './components/RootNode';
import ClickNode from './components/ClickNode';

const nodeTypes = {
  'RootNode': RootNode,
  'ClickNode': ClickNode
}
const initialNodes = [
  { id: '1', type: 'RootNode', position: { x: 0, y: 0 },},
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }},
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated :true, type: 'smoothstep', 
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 7,
    height: 7,
    color: 'rgba(255,255,255,0.6)',
  },
  style: {
  strokeWidth: 3, stroke: 'rgba(255,255,255,0.6)',
}  }];



export default function App() {

const [nodeItr, setNodeItr] = useState(3)
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

  const addNode = (nodeType) => {
    let newNode = {}
    if (nodeType == "RootNode") {
      newNode = { id: String(nodeItr), type: 'RootNode', position: { x: 0, y: 0 },}
    }
    else if (nodeType == "ClickNode") {
      newNode = { id: String(nodeItr), type: 'ClickNode', position: { x: 0, y: 0 },}

    }

    setNodeItr(nodeItr + 1)
    setNodes([...nodes, newNode])
  }
 
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
        <motion.div animate={{width: (toggleBar) ? '25vw' : '0%'}}className="toggleBarContainer">
         <motion.div animate={{width: (toggleBar) ? '100%' : '0%'}} className="addSection">

            <div className='sidebarHeader'>
              <p>Nodes</p>
              <motion.p className='closeButton' whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={toggle}>X</motion.p>
            </div>

            <div className='nodelist'>
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("RootNode")}}>Root Node</motion.div>
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("ClickNode")}}>Click</motion.div>
            </div>
            
          </motion.div>
      </motion.div>

    </div>
    
  );
}