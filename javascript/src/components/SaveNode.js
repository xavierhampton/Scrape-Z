import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../static/Node.css'

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
          <input type='text' className="url-input" placeholder='CSS Selector' onChange={(e) => {data.cssSelector = e.target.value}}></input>
          </div>
          <div className='row'>
          <input type='text' className="prefix-input" placeholder='File Prefix' onChange={(e) => {data.filePrefix = e.target.value}}></input>

          </div>
        </div>
        
      </div >
    </>
  );
});