
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSelector } from "react-redux";
import UpdateProfileDialog from "@/components/utils/UpdateProfileDialog";
import { CircleArrowOutUpRight } from "lucide-react";

const Profile = () => {
  // const { profileId } = useParams();
  //@ts-ignore
  const data = useSelector((state) => state.user);
  const { username, id, profileImg, bio, social } = data;
  return (
    <div className="p-10 flex justify-center w-full">
      {/* <Button type="submit" className="">
        Go Back
      </Button> */}
      <div className="flex flex-col max-w-[30rem] min-w-[25rem]">
        <div className=" flex flex-col h-[18rem] border-gray-200 border-[1px] p-4 justify-center">
          <div className="flex justify-between">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profileImg} />
              <AvatarFallback>{username.toUpperCase()[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p>@{username}</p>
              <p>joined on 21/04/2020</p>
              <UpdateProfileDialog/>
            </div>
          </div>
          <p>{bio}</p>
          <a
            className="flex items-center"
            href={"https://google.com"}
            target="_blank"
          >
            Reach out to me
            <CircleArrowOutUpRight
              size={18}
              className="cursor-pointer ml-2 text-gray-600 hover:text-black"
            />
          </a>
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
