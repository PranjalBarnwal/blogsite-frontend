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
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlogPreview from "@/components/utils/BlogPreview";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Menu from "@/components/utils/Menu";

const Blogs = () => {
  const [search, setSearch] = useState("Search");
  return (
    <div className="h-full">
      <div className="fixed bottom-[2rem] right-[2.4rem]">
        <Menu/>
      </div>
      <div className="w-full mt-10 flex flex-col items-center h-full">
        <div className="flex max-w-[30rem] min-w-[20rem] ml-auto mr-auto items-center space-x-2">
          <Input type="email" placeholder="Search" />
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
              <DropdownMenuItem>Dev</DropdownMenuItem>
              <DropdownMenuItem>Dsa</DropdownMenuItem>
              <DropdownMenuItem>Python</DropdownMenuItem>
              <DropdownMenuItem>Java</DropdownMenuItem>
              <DropdownMenuItem>Javascript</DropdownMenuItem>
              <DropdownMenuItem>Typescript</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-5 flex flex-wrap">
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
