import React, { useCallback, useState } from 'react';
import './FlowDropItems.scss';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow';
import { postFile } from '../../utils/Api';
import ImageNode from '../ImageNode/ImageNode';

import 'reactflow/dist/style.css';

const getNodeId = () => `${String(+new Date()).slice(6)}`; 

const nodeTypes = {
  imageNode: ImageNode,
};

function FlowDropItems({initialNodes, initialEdges}: any) {
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [uploadFile, setUploadFile] = useState<any | undefined>();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
  [setEdges],);

  const handleChange = (e: any) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await postFile(formData);
    const data = await res?.json();

    setUploadFile(data);

    const id = getNodeId();

    const newNode = {
      id,
      type: "imageNode",
        data: {
          image: {
            url: data.filePath,
            height: 400,
            width: 300
          }
        },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  }

  return (
    <div>
      <input type='file' accept='.jpg' onChange={handleChange}/>
      <button onClick={handleUpload}>Загрузить</button>
      {uploadFile && 
        <div>
          <p>{uploadFile.fileName}</p>
          <img src={uploadFile.filePath} alt={uploadFile.fileName} style={{width: "100px", height: "100px"}}/>
        </div>
      }
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowDropItems;