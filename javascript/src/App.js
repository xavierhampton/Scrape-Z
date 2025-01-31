//Imports
import React, { useCallback, useEffect, useState } from 'react';
import {motion} from 'motion/react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  ConnectionLineType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './static/App.css'

//Component Nodes
import ClickNode from './components/ClickNode';
import SaveNode from './components/SaveNode';
import RootNode from './components/RootNode';

//Node Types for React Flow
const nodeTypes = {
  'RootNode': RootNode,
  'ClickNode': ClickNode,
  'SaveNode': SaveNode
}
//Initialize Nodes
const initialNodes = [
  { id: '1', type: 'RootNode', position: { x: 50, y: 50 }, data: {}},
  { id: '2', type: "SaveNode", position: { x: 200, y: 350 }, data: {}},
];

//Initalize Edges
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


//Start of App
export default function App() {

//Keeps An Iterator for Node ID
const [nodeItr, setNodeItr] = useState(3)

//Toggle Bar Functionality
const [toggleBar, setToggleBar] = useState(false)
const toggle = () => {
  setToggleBar(!toggleBar)
}

//Sets Initial Nodes and Edges to ReactFlow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 

  //Sets Style of Edges When Created
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({...params, animated :true, type: 'smoothstep', markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 7,
      height: 7,
      color: 'rgba(255,255,255,0.6)',
    },
    style: {
      strokeWidth: 3, stroke: 'rgba(255,255,255,0.6)',
    } }, eds)),
    [setEdges],
  );


//Creates a Node and adds it to ReactFlow DOM
  const addNode = (nodeType) => {
    let newNode = {}
    if (nodeType === "RootNode") {
      newNode = { id: String(nodeItr), type: 'RootNode', position: { x: 0, y: 0 }, data: {}}
    }
    else if (nodeType === "SaveNode") {
      newNode = { id: String(nodeItr), type: 'SaveNode', position: { x: 0, y: 0 }, data: {}}
    }
    else if (nodeType === "ClickNode") {
      newNode = { id: String(nodeItr), type: 'ClickNode', position: { x: 0, y: 0 }, data: {}}

    }

    setNodeItr(nodeItr + 1)
    setNodes([...nodes, newNode])
  }

  
  //Turn Nodes Into Readable Object
  function objectify() {
    let obj = {}
  }


  //Assign a State for Data
  const [data, setData] = useState("")
  //Send Data to Backend
  function run() {
    fetch('https://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  useEffect(() => {
    console.log(nodes)
    console.log(edges)
  }, [nodes, edges])


  //The DOM
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
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{strokeWidth: 3}}
      >
        <Controls />
        <Background variant="lines" gap={50} size={1} />
      </ReactFlow>

      {/* Toggle Button */}
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
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("RootNode")}}>Root</motion.div>
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("SaveNode")}}>Save</motion.div>
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("ClickNode")}}>Click</motion.div>

            </div>
            
          </motion.div>
      </motion.div>

    </div>
    
  );
}