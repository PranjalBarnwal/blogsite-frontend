
import { X } from 'lucide-react';
const Tag = ({name}:any) => {
  return (
    <span className='bg-yellow-200 rounded-3xl flex items-center px-2 py-1 text-yellow-800'>
      {name}
      <X size={18}/>
    </span>
  )
}

export default Tag
