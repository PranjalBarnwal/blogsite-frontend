import React from 'react'
import { X } from 'lucide-react';
const Tag = ({name}:any) => {
  return (
    <span className='bg-yellow-200 rounded-3xl flex items-center'>
      {name}
      <X size={18}/>
    </span>
  )
}

export default Tag
