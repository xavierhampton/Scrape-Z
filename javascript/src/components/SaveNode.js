import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import './SaveNode.css'

export default memo(({ data, isConnectable, selected, }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className='node' style={{ outlineColor: (selected) ?  '#555555': '#3C3C3C', outlineWidth: (selected) ? '2px' : '1px'}}>
        <div className='header'>
            <p className='title'>Save</p>
        </div>
        <div className='subsection'>
          <div className='row'>
              
          </div>
          <div className='row'>

          </div>
        </div>
        
      </div >
    </>
  );
});