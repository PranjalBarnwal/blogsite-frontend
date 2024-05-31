import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="flex items-center justify-between sticky top-6">
      <p className="font-bold text-[1.5rem]">devBlogs.</p>

    <Link to="signup">Signup</Link>
      <Link to="signin">Signin</Link>
      <Link to="profile/123">Profile</Link>
      <Link to="blogs">Blogs</Link>
      <Button type="submit" className="" onClick={()=>navigate("/createBlog")}>
        Create a Blog
      </Button>
    </div>
  );
};

export default Navbar;
