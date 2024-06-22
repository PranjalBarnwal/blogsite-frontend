import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { formatDate } from "@/components/utils/utils";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { Share2 } from "lucide-react";
import TagUncrossed from "@/components/utils/TagUncrossed";
import { useSelector } from "react-redux";
const ViewBlog = () => {
  //@ts-ignore
  const id = useSelector((state) => state.user.id);
  const { postId } = useParams();
  const [blogData, setBlogData] = useState<any>();

  const authorName = blogData?.author?.username;
  const authorImg = blogData?.author?.profileImg;
  const publishedDate = blogData?.updatedAt;

  const blogTitle = blogData?.title;
  const blogContent = blogData?.content;
  const blogViews = blogData?.views;
  const blogTags = blogData?.tags;
  const blogReadtime = blogData?.readtime;

  const handleFetch = async () => {
    console.log("hello");

    const response = await fetch(
      `http://127.0.0.1:8787/api/v1/blog/fetch/${postId}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.blog);
      setBlogData(data.blog);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="primarycontainer mt-10 flex sm:flex-row flex-col sm:h-20 justify-around ">
      <div className="user flex items-center space-x-2 sm:mb-0 mb-6">
        <Avatar className="w-12 h-12">
          <AvatarImage src={authorImg} />
          <AvatarFallback>{authorName?.toUpperCase()[0] || "A"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-2xl">@{authorName}</p>
          <p className="text-sm">posted on {formatDate(publishedDate)}</p>
        </div>
      </div>
      <div className="blog max-w-[40rem]  flex flex-col space-y-7">
        <div className="titleAndInteractions">
          <p className="title font-bold text-2xl">{blogTitle}</p>
          <div className="interactionsAndReadtime flex justify-between">
            <p className="text-gray-600 text-sm text-opacity-75 tracking-tighter">
              {blogReadtime} minute read
            </p>
            <div className="interactions flex space-x-2">
              {id && (
                <div className="share flex flex-col items-center space-y-[-3px] text-center cursor-pointer ">
                  <ThumbsUp className="hover:text-gray-600" />
                  <p className="text-xs">2k</p>
                </div>
              )}
              {id && (
                <div className="share flex flex-col items-center space-y-[-3px] text-center cursor-pointer ">
                  <ThumbsDown className="hover:text-gray-600" />
                  <p className="text-xs">2k</p>
                </div>
              )}
              <div className="share flex flex-col items-center space-y-[-3px] text-center">
                <Eye />
                <p className="text-xs">2k</p>
                {/* <p>{blogViews}</p> */}
              </div>
              <Share2 className="hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blogContent }}
          className="blogcontent text-justify"
        ></div>
      </div>
      <div className="tags max-w-[25rem] min-w-[20rem]">
        <p className="font-bold text-2xl mb-4">Tags:</p>
        <div className="flex flex-wrap space-x-2">
          {blogTags?.map((tag: any, index: any) => (
            <TagUncrossed key={index} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
