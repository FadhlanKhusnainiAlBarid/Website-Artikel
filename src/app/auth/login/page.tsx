"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../../../public/images/logo-img.png";
import { EyeOff, Eye } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username field cannot be empty.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [togleEye, setTogleEye] = useState<boolean>(false);
  const router = useRouter();
  const cookies = useCookies();

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/auth/login", value);
      cookies.set("token", response.data.token);
      cookies.set("role", response.data.role);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: value.username,
          password: value.password,
          role: response.data.role,
        })
      );
      if (response.data.role === "User") {
        router.push("/");
      } else {
        router.push("/dashboard/articles");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="h-screen place-content-center rounded-none md:rounded-xl md:h-fit w-full md:max-w-[400px] space-y-6 py-10 md:px-4 px-[26px]">
        <CardHeader className="px-0 mb-0">
          <CardTitle className="flex justify-center">
            <Image src={Logo} alt="Logoipsum" />
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="px-0">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <FormControl>
                        <Input
                          className="h-10 font-[family-name:var(--font-archivo)]"
                          id="username"
                          type="text"
                          placeholder="Input username"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <Label
                        htmlFor="password"
                        className="font-[family-name:var(--font-archivo)]"
                      >
                        Password
                      </Label>
                      <div className="relative flex items-center">
                        <FormControl>
                          <Input
                            className="h-10 pr-8 font-[family-name:var(--font-archivo)]"
                            id="password"
                            type={togleEye ? "text" : "password"}
                            placeholder="Input password"
                            {...field}
                            required
                          />
                        </FormControl>
                        {togleEye ? (
                          <Eye
                            onClick={() => setTogleEye(!togleEye)}
                            className="cursor-pointer absolute right-2 size-4 text-gray-400"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setTogleEye(!togleEye)}
                            className="cursor-pointer absolute right-2 size-4 text-gray-400"
                          />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-6 px-0">
              <Button
                type="submit"
                size="lg"
                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500 font-[family-name:var(--font-archivo)]"
              >
                Login
              </Button>
              <span className="text-sm font-[family-name:var(--font-archivo)]">
                {"Don't have an account? "}
                <Link
                  className="text-blue-600 underline underline-offset-2"
                  href="register"
                >
                  Register
                </Link>
              </span>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
