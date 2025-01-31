import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import '../static/Node.css'

export default memo(({ data, isConnectable, selected, }) => {

  return (
    <>
      <Handle
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className='node-root' style={{ outlineColor: (selected) ?  '#555555': '#3C3C3C', outlineWidth: (selected) ? '2px' : '1px'}}>
        <div className='header'>
            <p className='title'>Root</p>
        </div>
        <div className='subsection'>
          <div className='row'>
              <input type='text' className="url-input" placeholder='URL' onChange={(e) => {data.url = e.target.value}}></input>
          </div>
          <div className='row'>

          </div>
          <div className='row'>

          </div>
          <div className='row'>

          </div>
        </div>
        
      </div >
    </>
  );
});