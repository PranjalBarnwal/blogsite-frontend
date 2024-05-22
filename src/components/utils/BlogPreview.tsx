import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from 'lucide-react';

const BlogPreview = () => {
  return (
    <div className="max-w-[43rem] min-w-[23rem] w-[60vw] flex space-x-3 p-3 m-2 border-gray-300 rounded-md border-[1px] shadow-md">
      {/* <div> */}
      <Avatar className="w-10 h-10 mt-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {/* </div> */}
      <div>
        <p className="font-semibold">Advice From a Software Engineer With 8 Years of Experience</p>
        <p>My name is Benoit. I have been a software engineer for the past eight and a half years. I stayed at my previous (and first) company for seven...</p>
        <p className="flex text-[.7rem] items-center text-gray-400"><CalendarDays className="w-4"/>Posted December 2021</p>
      </div>
    </div>
  );
};

export default BlogPreview;
