import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import './RootNode.css'

export default memo(({ data, isConnectable, selected, }) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className='node' style={{ outlineColor: (selected) ?  '#555555': '#3C3C3C', outlineWidth: (selected) ? '2px' : '1px'}}>
        <p className='title'>Root Node</p>
      </div >
     
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
});