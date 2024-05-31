import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
const CreateBlog = () => {
  const [value, setValue] = useState("");
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
  const module = {
    toolbar: toolbarOptions,
  };
  const [wordCount,setWordCount]=useState(234);
  return (
    <>
      <ReactQuill
        className="max-h-[72vh] h-[72vh] mt-5 border-none"
        theme="snow"
        value={value}
        onChange={() => {
          setValue(value);
        }}
        modules={module}
      />
      <div className="fixed bottom-[2rem] sm:flex justify-around items-center w-full "> 
        <div className="font-semibold">Word Count - {wordCount}</div>
        <div className="font-semibold">Readtime  - {wordCount/200} minutes</div>
        <Button>Publish</Button>
      </div>
    </>
  );
};

export default CreateBlog;
