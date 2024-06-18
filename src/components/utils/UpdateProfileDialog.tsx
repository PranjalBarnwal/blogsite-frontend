import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convertBase64 } from "./utils";
import { useDispatch } from "react-redux";
import { addCompleteDetails } from "@/slice/userSlice";

const UpdateProfileDialog = () => {
  //@ts-ignore
  const id = useSelector((state) => state.user.id);
  const dispatch=useDispatch();
  const [profileFields, setProfileFields] = useState({
    id: id,
    profileImg: "",
    bio: "",
    social: "",
    password:"",
  });

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfileFields((prev) => ({ ...prev, profileImg: base64 + "" }));
  };
  const handleUpdateFields=(obj:any)=>{
    const filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== undefined && value !== '')
    );
    return filteredObj;
  }
const handleSubmit=async()=>{
    const fieldsToUpdate=handleUpdateFields(profileFields);
    const options={
      method: 'PUT', // Use PUT for updating data
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldsToUpdate),
    }
    try {
      const response = await fetch('http://127.0.0.1:8787/api/v1/user/updateProfile', options);

      if (response.ok) {
        const updatedProfile = await response.json();
        dispatch(addCompleteDetails(fieldsToUpdate));
        
        
      } else {
        console.log(response);
        
        console.error('Profile update failed:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error updating profile:', error);
    }
}  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil size={12} />
          &nbsp;Edit
        </Button>
      </DialogTrigger>
      
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to the fields you want to update. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Profile Picture</Label>
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileFields.profileImg} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Input id="picture" type="file" onChange={(e) => handleFile(e)} />
            </div>
            
           
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={profileFields.password}
                onChange={(e) =>
                  setProfileFields((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                type="text"
                className="col-span-3"
                value={profileFields.bio}
                onChange={(e) =>
                  setProfileFields((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Social
              </Label>
              <Input id="social" type="text" className="col-span-3" value={profileFields.social}
            onChange={(e) =>
              setProfileFields((prev) => ({ ...prev, social: e.target.value }))
            }/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
  );
};

export default UpdateProfileDialog;
