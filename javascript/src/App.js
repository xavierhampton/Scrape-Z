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
import InputNode from './components/InputNode';



//Node Types for React Flow
const nodeTypes = {
  'RootNode': RootNode,
  'ClickNode': ClickNode,
  'SaveNode': SaveNode,
  'InputNode': InputNode,
}

//Start of App
export default function App() {

//Keeps An Iterator for Node ID
const [nodeItr, setNodeItr] = useState(3)


//Initialize Nodes
const initialNodes = [
  { id: '1', type: 'RootNode', position: { x: 50, y: 50 }, data: {f: run, id: String(nodeItr)}},
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
      newNode = { id: String(nodeItr), type: 'RootNode', position: { x: 0, y: 0 }, data: {f: run, id: String(nodeItr)}}
    }
    else if (nodeType === "SaveNode") {
      newNode = { id: String(nodeItr), type: 'SaveNode', position: { x: 0, y: 0 }, data: {}}
    }
    else if (nodeType === "ClickNode") {
      newNode = { id: String(nodeItr), type: 'ClickNode', position: { x: 0, y: 0 }, data: {}}
    }
    else if (nodeType === "InputNode") {
      newNode = { id: String(nodeItr), type: 'InputNode', position: { x: 0, y: 0 }, data: {}}
    }

    setNodeItr(nodeItr + 1)
    setNodes([...nodes, newNode])
  }

    //Send Data to Backend
    async function run() {
      try {
        let response = await fetch('http://localhost:5000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nodes: nodes, edges: edges}),
          mode: "cors"
        })
      }
      catch {
        console.log("Error With Flask Server")
      }
    }

    //If Nodes, Edges Update, Update the Function Reference
    useEffect(() => {
      for (let node of nodes) {
        if (node.type === "RootNode") {
            node.data.f = run
        }
    }}, [nodes, edges])
    
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
              <motion.div animate={{width: (toggleBar) ? '55%' : '0%'}} whileTap={{ scale: 0.9, rotate: 3, opacity: 0.9 }} whileHover = {{scale: 1.15}} onClick={() => {addNode("InputNode")}}>Input</motion.div>


            </div>
            
          </motion.div>
      </motion.div>

    </div>
    
  );
}