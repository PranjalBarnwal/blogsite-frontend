import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_IMG } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseSelector, useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCompleteDetails } from "@/slice/userSlice";


const CompleteProfile = () => {
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  //@ts-ignore
  const id=useSelector((state)=>state.user.id)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [socialErr,setSocialErr]=useState("");
  const [profileFields, setProfileFields] = useState({
    id:id,
    profileImg: DEFAULT_IMG,
    bio: "",
    social: "",
    securityQuestion: "What is your favourite food?",
    securityAns: "",
  });

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfileFields((prev) => ({ ...prev, profileImg: base64 + "" }));
  };
  const checkFields=(fields:any)=>{
    const link=fields.social;
    if(link.includes("linkedin.com")||link.includes("twitter.com")) return true;
    else return false;
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(profileFields),
    headers: { 'Content-Type': 'application/json' },
  };


  const handleCompleteProfile = async (e:any) => {
    e.preventDefault();
    const check=checkFields(profileFields);
    if(!check){
        setSocialErr("Enter valid linkedin or X(Twitter) profile");
        return;
    }
    const response = await fetch(
      "http://127.0.0.1:8787/api/v1/user/completeProfile",
      options
    );
    console.log(response);
    console.log(profileFields);
    
    
    if(response.ok){
        const data=await response.json();
        dispatch(addCompleteDetails(data));
        navigate("/blogs");
    }
  };



  return (
    <div className="flex w-full h-full justify-center items-center">
      <form className="flex flex-col gap-y-4 max-w-[26rem] ">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Profile Picture</Label>
          <Avatar className="w-16 h-16">
            <AvatarImage src={profileFields.profileImg} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input id="picture" type="file" onChange={(e) => handleFile(e)} />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Bio</Label>
          <Textarea
            maxLength={150}
            placeholder="Type your message here. Limit(150 characters)"
            id="message"
            value={profileFields.bio}
            onChange={(e) =>
              setProfileFields((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </div>
        <div className="social">
          <Label htmlFor="social">Add Your Social Link</Label>
          <Input
            required
            type="text"
            placeholder="linkedIn/twitterProfile(X profile)"
            id="social"
            value={profileFields.social}
            onChange={(e) =>
              setProfileFields((prev) => ({ ...prev, social: e.target.value }))
            }
          />
          {socialErr&&<p className="text-red-500">{socialErr}</p>}
        </div>
        <div>
          <Label>Security Question</Label>

          <DropdownMenu >
            <DropdownMenuTrigger className="flex min-w-[23rem] p-[0.4rem] rounded-md border-gray-400 border-[1px] justify-between">
              {profileFields.securityQuestion}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  setProfileFields((prev) => ({
                    ...prev,
                    securityQuestion: "What is your favourite food?",
                  }))
                }
              >
                What is your favourite food?
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setProfileFields((prev) => ({
                    ...prev,
                    securityQuestion:
                      "What was the name of the street you grew up on?",
                  }))
                }
              >
                What was the name of the street you grew up on?
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setProfileFields((prev) => ({
                    ...prev,
                    securityQuestion: "What is a secret talent you possess?",
                  }))
                }
              >
                What is a secret talent you possess?
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setProfileFields((prev) => ({
                    ...prev,
                    securityQuestion:
                      "What was your favorite vacation spot as a child?",
                  }))
                }
              >
                What was your favorite vacation spot as a child?
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setProfileFields((prev) => ({
                    ...prev,
                    securityQuestion:
                      "What was the name of your favourite school teacher?",
                  }))
                }
              >
                What was the name of your favourite school teacher?
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="answer">
          <Input
          required
            type="text"
            placeholder="Answer in one word only"
            value={profileFields.securityAns}
            onChange={(e) =>
              setProfileFields((prev) => ({
                ...prev,
                securityAns: e.target.value.toLowerCase().trim(),
              }))
            }
          />
        </div>
        <Button onClick={handleCompleteProfile} variant="default">
          Complete Profile
        </Button>
      </form>
    </div>
  );
};

export default CompleteProfile;
