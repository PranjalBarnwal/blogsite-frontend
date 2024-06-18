import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const ViewBlog = () => {
  const {postId}=useParams();
  const [blogData,setBlogData]=useState();
  
  const handleFetch=async()=>{
    const response=await fetch(`http://127.0.0.1:8787/api/v1/blog/fetch/${postId}`);
    if(response.ok){
      // console.log(response);
      const data=await response.json();
      // console.log(data);
      setBlogData(data);
    }
  }
  useEffect(()=>{
    handleFetch();
  })  
  return (
    <div>
      
      Post Id-{postId}
    </div>
  )
}

export default ViewBlog
