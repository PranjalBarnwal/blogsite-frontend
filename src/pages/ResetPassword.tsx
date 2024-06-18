import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addToken } from "@/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [err, setErr] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  //@ts-ignore
  const id = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      password: pass,
    }),
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErr("");
    if (pass !== pass2) {
      setErr("please write same password in both fields");
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:8787/api/v1/user/resetPassword",
      options
    );
    if (response.ok) {
      const data = await response.json();
      if (data.id) {
        console.log(data);
        console.log("reset successful");
        
        navigate("/signin");
      }
    } else {
      setErr("error while updating password");
    }
  };
  return (
    <div className="h-[90vh] flex flex-col justify-center">
      <Card className="mx-auto max-w-sm min-w-[20rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="XXXXX98"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Repeat Password</Label>
              </div>
              <Input
                id="password2"
                type="password"
                placeholder="XXXXX98"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                required
              />
            </div>
            {err && <div className="text-red-700">{err}</div>}
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Reset
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
