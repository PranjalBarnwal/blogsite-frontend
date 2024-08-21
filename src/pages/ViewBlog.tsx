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
  const UPVOTE = "upvote";
  const DOWNVOTE = "downvote";

  //@ts-ignore
  const id = useSelector((state) => state.user.id);
  //@ts-ignore
  const jwtToken = useSelector((state) => state.user.token);
  const { postId } = useParams();
  const [blogData, setBlogData] = useState<any>();
  const [upvote, setUpvote] = useState<any>(false);
  const [downvote, setDownvote] = useState<any>(false);
  const [disable, setDisable] = useState<any>(false);

  const authorName = blogData?.author?.username;
  const authorImg = blogData?.author?.profileImg;
  const publishedDate = blogData?.updatedAt;

  const blogTitle = blogData?.title;
  const blogContent = blogData?.content;
  const blogVotes = blogData?.Vote ?? [];

  const blogTags = blogData?.tags;
  const blogReadtime = blogData?.readtime;
  const headers = new Headers({
    Authorization: `Bearer ${jwtToken}`,
  });

  const invertVote = (voteType: any) => {
    if (voteType === UPVOTE)
      setUpvote((upvote: any) => {
        console.log(!upvote + "-" + downvote);
        return !upvote;
      });
    else if (voteType === DOWNVOTE)
      setDownvote((downvote: any) => {
        console.log(upvote + "-" + !downvote);
        return !downvote;
      });
  };
  const deleteVote = async (id: any) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8787/api/v1/blog/vote/" + id,
        {
          method: "DELETE",
          headers,
        }
      );
      if (response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("deleted" + data);
      return data;
    } catch (err) {
      console.log("Error deleting vote" + err);
    }
  };
  const processVote = async (voteType: any) => {
    try {
      setDisable(true);
      console.log(blogVotes);

      const altVote = voteType == UPVOTE ? DOWNVOTE : UPVOTE;
      const indexOfSame = blogVotes?.findIndex(
        (blog: any) =>
          blog.postId === postId &&
          blog.userId === id &&
          blog.voteType === voteType
      );
      console.log("same" + indexOfSame);
      const indexOfDiff = blogVotes?.findIndex(
        (blog: any) =>
          blog.postId === postId &&
          blog.userId === id &&
          blog.voteType === altVote
      );
      console.log("diff" + indexOfDiff);
      if (indexOfSame != -1) {
        console.log(blogVotes[indexOfSame].id);
        await deleteVote(blogVotes[indexOfSame].id);
        blogVotes.splice(indexOfSame, 1);
        console.log("called");
        
        invertVote(voteType);
      } else if (indexOfDiff != -1) {
        await deleteVote(blogVotes[indexOfDiff].id);
        blogVotes.splice(indexOfDiff, 1);
        invertVote(altVote);
        const vote = await createVote(postId, id, voteType);
        console.log(vote);
      } else {
        const vote = await createVote(postId, id, voteType);
        console.log(vote);
      }
    } catch (err) {
      console.error("Error creating vote:", err);
    } finally {
      setDisable(false);
    }
  };

  const createVote = async (postId: any, userId: any, voteType: any) => {
    const response = await fetch("http://127.0.0.1:8787/api/v1/blog/vote", {
      method: "POST",
      headers,
      body: JSON.stringify({ postId, userId, voteType }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    blogVotes.push(data.vote);
    invertVote(voteType);
    console.log(blogVotes);
    return data;
  };

  const handleFetch = async () => {
    const response = await fetch(
      `http://127.0.0.1:8787/api/v1/blog/fetch/${postId}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.blog);
      setBlogData(data.blog);
      console.log(blogVotes);
  
      const voteType = data.blog?.Vote?.find((vote: any) => vote.userId == id)?.voteType;
      invertVote(voteType);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="primarycontainer mt-10 flex sm:flex-row flex-col sm:h-20 justify-around ">
      <div className="user flex items-center space-x-2 sm:mb-0 mb-6 ">
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
                <div
                  className={`share flex flex-col items-center space-y-[-3px] text-center ${
                    disable ? "cursor-wait" : "cursor-pointer"
                  }`}
                >
                  <ThumbsUp
                    className={`${upvote ? "text-green-500" : "text-gray-600"}`}
                    onClick={() => !disable && processVote(UPVOTE)}
                  />
                  <p className="text-xs">2k</p>
                </div>
              )}
              {id && (
                <div
                  className={`share flex flex-col items-center space-y-[-3px] text-center ${
                    disable ? "cursor-wait" : "cursor-pointer"
                  }`}
                >
                  <ThumbsDown
                    className={`${downvote ? "text-red-600" : "text-gray-600"}`}
                    onClick={() => !disable && processVote(DOWNVOTE)}
                  />
                  <p className="text-xs">2k</p>
                </div>
              )}
              <div className="share flex flex-col items-center space-y-[-3px] text-center">
                <Eye />
                <p className="text-xs">2k</p>
                {/* <p className="text-xs">{blogViews}</p> */}
              </div>
              <Share2 className="hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blogContent }}
          className="blogcontent text-justify "
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
