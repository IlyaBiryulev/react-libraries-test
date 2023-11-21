import React, { useCallback, useState } from 'react';
import './Flow.scss';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import ToolBar from '../ToolBar/ToolBar';

const getNodeId = () => `${String(+new Date()).slice(6)}`;

function Flow({initialNodes, initialEdges}: any) {
  const [title, setTtitle] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleChange = (e: any) => {
    setTtitle(e.target.value)
  }
    
  const onAdd = (e: any) => {
    e.preventDefault();
    const id = getNodeId();
    const newNode = {
      id,
      data: { label: title },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };
    
 
  return (
    <div>
      <ToolBar title={title} onChange={handleChange} onAdd={onAdd}/>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;