import { Link } from "react-router-dom";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addIdandName } from "@/slice/userSlice";
const ForgotPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");
  const [verificationErr, setVerificationErr] = useState("");

  const optionsEmail = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  const optionsVerify = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      answer,
    }),
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!question) {
      const response = await fetch(
        "http://127.0.0.1:8787/api/v1/user/securityQuestion",
        optionsEmail
      );
      const data = await response.json();
      if (response.ok) {
        setQuestion(data.question);
        setErr("");
      } else {
        setErr("no data found");
      }
    } else {
      const response = await fetch(
        "http://127.0.0.1:8787/api/v1/user/verifyAnswer",
        optionsVerify
      );

      if (response.ok) {
        const data = await response.json();
        if (data.result == true) {
          console.log("verified");
          dispatch(addIdandName(data.id));
          navigate("/resetPassword");
        }
        if (data.result == false) {
          console.log("unverified");
        }
      } else {
        console.log("unverifieddd");
        setVerificationErr("The answer is not correct");
      }
    }
  };
  return (
    <div className="h-[90vh] flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ForgotPassword</CardTitle>
          <CardDescription>
            Enter the email associated with your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {err && <div className="text-red-600">{err}</div>}
            {question && (
              <div className="space-y-2">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Question</Label>
                  </div>
                  <div>{question}</div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Answer</Label>
                  <Input
                    id="answer"
                    type="text"
                    value={answer}
                    placeholder="Enter your answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
                {verificationErr && (
                  <div className="text-red-600">{verificationErr}</div>
                )}
              </div>
            )}
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {question ? "Verify" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPass;
