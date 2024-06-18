// import { Button } from "@/components/ui/button";
import {
  Calculator,
  Pencil,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
// ---
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import BlogPreview from "@/components/utils/BlogPreview";
import { Input } from "@/components/ui/input";
import Tag from "@/components/utils/Tag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Menu from "@/components/utils/Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("Search");
  const tags = [
    "Fresher",
    "Selected",
    "Amazon",
    "Apple",
    "React",
    "Full-Stack",
    "Java",
  ];
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [blogPreviews, setBlogPreviews] = useState<any>([]);

  const handleTagClick = (tag: string) => {
    if (activeTags.includes(tag)) return;
    setActiveTags((prevTags: string[]) => [...prevTags, tag]);
  };
  const removeTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.filter((existingTag) => existingTag !== tag)
    );
  };
  //@ts-ignore
  const jwtToken = useSelector((state) => state.user.token);

  useEffect(() => {
    const headers = new Headers({
      Authorization: `Bearer ${jwtToken}`,
    });

    const fetchBlogs = async () => {
      const response = await fetch(
        "http://127.0.0.1:8787/api/v1/blog/allPosts",
        {
          method: "GET",
          headers,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBlogPreviews(data.posts);
        console.log(data.posts);
        
      } else {
        console.log(data.error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="h-full">
      <div className="fixed bottom-[2rem] right-[2.4rem]">
        <Menu />
      </div>
      <div className="w-full mt-10 flex flex-col items-center h-full">
        <div className="flex max-w-[30rem] min-w-[20rem] ml-auto mr-auto items-center space-x-2">
          <Input type="text" placeholder="Search" />
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center p-[0.4rem] rounded-md border-gray-400 border-[1px]">
              Search
            </DropdownMenuTrigger>
            <DropdownMenuTrigger className=" flex items-center p-[0.4rem] rounded-md border-gray-400 border-[1px]">
              {search}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSearch("Blogs")}>
                Blogs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearch("Author")}>
                Author
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[7rem] p-[0.4rem] rounded-md border-gray-400 border-[1px]">
              Tags
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex w-[15rem] flex-wrap space-x-2 space-y-2">
                {tags.map((tag, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="border-gray-400 border-[1px] cursor-pointer"
                  >
                    {tag}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap max-h-5/6  space-x-2 p-1 space-y-1 ">
          {activeTags.map((tag, index) => (
            <span className="cursor-pointer" onClick={() => removeTag(tag)}>
              <Tag key={index} name={tag} />
            </span>
          ))}
        </div>
        <div className="mt-5 ">
          {blogPreviews.map((blogPreview: any, index: any) => (
            <Link key={index} to={`/post/${blogPreview.id}`}>
              <BlogPreview
                key={index}
                profileImg={blogPreview.author.profileImg}
                title={blogPreview.title}
                content={blogPreview.content}
                username={blogPreview.author.username}
                publishedAt={blogPreview.publishedAt}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
