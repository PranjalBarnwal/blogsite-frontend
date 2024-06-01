import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tag from "@/components/utils/Tag";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  //@ts-ignore
  const jwtToken = useSelector((state) => state.user.token);
  //@ts-ignore
  const authorId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [err, setErr] = useState("");

  const headers = new Headers({
    Authorization: `Bearer ${jwtToken}`,
  });

  const postData = {
    title,
    content: value,
    authorId,
    tags: activeTags,
    readtime: Math.round(wordCount / 150),
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(postData),
  };
  const handleSubmit = async () => {
    setErr("");
    if(postData.title===""){
      setErr("Enter Title");
      return;
    }
    if(value.length<20) {
      setErr("Post should contain minimum 30 words");
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:8787/api/v1/blog/post",
      options
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      navigate("/blogs");
    } else {
      const data = await response.json();
      console.log(data.err);
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const tags = [
    "Fresher",
    "Selected",
    "Amazon",
    "Apple",
    "React",
    "Full-Stack",
    "Java",
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const handleTagClick = (tag: string) => {
    if (activeTags.includes(tag)) return;
    setActiveTags((prevTags: string[]) => [...prevTags, tag]);
  };
  const removeTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.filter((existingTag) => existingTag !== tag)
    );
  };
  const countWords = (value: string) => {
    const trimmedStr = value.trim();
    console.log(trimmedStr + "/");

    const words = trimmedStr.split(" ");
    setWordCount(words.length);
  };
  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse mt-5 justify-between">
        <form>
          <Input
            required
            className="active:outline-none active:border-none focus:border-none focus:outline-none"
            placeholder="Title of your blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {err}
          <ReactQuill
            className="max-h-[72vh] h-[72vh] w-full mr-2 border-none"
            theme="snow"
            value={value}
            onChange={(value) => {
              setValue(value);
              countWords(value);
            }}
            modules={module}
            placeholder="write your content here"
          />
        </form>
        <div className="max-w-[15rem] space-y-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[15rem]  p-[0.4rem]  border-gray-400 border-[1px] justify-between">
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
          <div className="  h-[15rem]  border-gray-400 border space-y-3">
            <p className="text-center border-b-[1px] border-gray-400">
              Applied Tags
            </p>
            <div className="flex flex-wrap max-h-5/6  space-x-2 p-1 space-y-1 overflow-y-scroll">
              {activeTags.map((tag, index) => (
                <span className="cursor-pointer" onClick={() => removeTag(tag)}>
                  <Tag id={index} name={tag} />
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-6 justify-around items-center w-full ">
            <div className="font-semibold">Word Count - {wordCount}</div>
            <div className="font-semibold">
              Readtime - {Math.round(wordCount / 150)} minutes
            </div>
            <Button onClick={handleSubmit}>Publish</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
