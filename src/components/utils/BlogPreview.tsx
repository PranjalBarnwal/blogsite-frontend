import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";

const BlogPreview = ({
  profileImg,
  title,
  content,
  username,
  publishedAt,
}: any) => {
  const truncatedContent =
    content.length > 20 ? content.slice(0, 40) + "..." : content;
  return (
    <div className="max-w-[43rem] min-w-[23rem] w-[60vw] flex space-x-3 p-3 m-2 border-gray-300 rounded-md border-[1px] shadow-md">
      {/* <div> */}
      <Avatar className="w-10 h-10 mt-3">
        <AvatarImage src={profileImg} />
        <AvatarFallback>{username.toUpperCase[0]}</AvatarFallback>
      </Avatar>
      {/* </div> */}
      <div>
        <p className="font-semibold">{title}</p>
        <p>{truncatedContent}</p>
        <p className="flex text-[.7rem] items-center text-gray-400">
          <CalendarDays className="w-4" />
          Posted {publishedAt}
        </p>
      </div>
    </div>
  );
};

export default BlogPreview;
