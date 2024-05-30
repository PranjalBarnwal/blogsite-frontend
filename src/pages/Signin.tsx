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
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const options = {
    method: "POST",
    body: JSON.stringify(login),
    headers: { "Content-Type": "application/json" },
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8787/api/v1/user/signin",
        options
      );
      if (response.ok) {
        const data = await response.json();
        if(data.jwt){
          dispatch(addToken(data.jwt));
          navigate("/blogs");
        }
        else console.log("error while logging in");
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={login.email}
                onChange={(e) => {
                  setLogin((prev) => ({ ...prev, email: e.target.value }));
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={login.password}
                onChange={(e) => {
                  setLogin((prev) => ({ ...prev, password: e.target.value }));
                }}
                required
              />

              <Link to="/forgotPassword" className="underline">
                Forgot password
              </Link>
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
