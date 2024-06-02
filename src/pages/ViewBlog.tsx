import { useParams } from 'react-router-dom'

const ViewBlog = () => {
    const {postId}=useParams();
   
    
  return (
    <div>
      
      Post Id-{postId}
    </div>
  )
}

export default ViewBlog
