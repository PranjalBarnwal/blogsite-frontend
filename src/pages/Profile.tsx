import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

const Profile = () => {
  const { profileId } = useParams();

  return (
    <div className="p-10 flex justify-center w-full">
      {/* <Button type="submit" className="">
        Go Back
      </Button> */}
      <div className="flex flex-col max-w-[30rem] ">
        <div className=" flex flex-col h-[18rem] border-gray-200 border-[1px] p-4 justify-center">
        <div className="flex justify-between">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p>@Username</p>
            <p>joined on 21/04/2020</p>
            {/* <Button className="py-0 px-1 h-6 bg-white text-black border-black border-[1px] hover:text-white">
              <Pencil className="w-[13px] " />
              Edit
            </Button> */}
            <Button variant="outline">
              <Pencil size={13} />
              Edit
            </Button>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nesciunt quibusdam obcaecati excepturi molestias nisi minus voluptate non explicabo fuga!
        </p>
        </div>
        <div className="flex justify-between border-gray-200 border-[1px] min-h-[7rem] items-center p-3">
            <div className="text-center">
                <p className=" font-semibold">blogsPosted</p>
                <p>12</p>
            </div>
            <div className="text-center">
                <p className=" font-semibold">upvotes</p>
                <p>28</p>
            </div>
            <div className="text-center">
                <p className=" font-semibold">totalViews</p>
                <p>2800</p>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default Profile;
