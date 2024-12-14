import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        Custom Color Picker Node: <strong>a</strong>
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