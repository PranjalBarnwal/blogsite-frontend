import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Settings } from 'lucide-react';
const Menu = () => {
  const navigate=useNavigate();
  //@ts-ignore
  const id=useSelector((state)=>state.user.id);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-[50%] w-[3rem] h-[3rem]" variant="default"> <Settings size={20}/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" onClick={()=>navigate(`/profile/${id}`)}>My Profile</Button>
          </DialogTrigger>

        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Suggest a feature</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Suggest a feature</DialogTitle>
              <DialogDescription>
                Help us serve you better
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Feature
                </Label>
                <textarea
                  id="feature"
                  placeholder="I want to suggest"
                  
                  className="col-span-3 border-[1px] rounded-md border-gray-400 p-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
