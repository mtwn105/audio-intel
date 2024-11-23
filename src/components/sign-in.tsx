"use client";
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
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label>Remember me</Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const response = await signIn.email({ email, password });
                console.log(response);
                if (response.error) {
                  toast.error(response.error.message);
                } else {
                  toast.success("Logged in successfully");
                }
              } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
