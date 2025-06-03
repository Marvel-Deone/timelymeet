'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/user";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [locationOrigin, setLocationOrigin] = useState<string>();
  const { isLoaded, user } = useUser();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(usernameSchema),
  });


  useEffect(() => {
    setLocationOrigin(window.location.origin);
    setValue("username", user?.username ?? "")
  }, [isLoaded]);

  const { loading, error, fn: fnUpdateUser } = useFetch(updateUsername);

  interface UsernameFormData {
    username: string;
  }

  const onSubmit = async (data: UsernameFormData) => {
    fnUpdateUser(data.username);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        {/* Latest Updates */}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2">
              <span>{locationOrigin}</span>
              <Input {...register("username")} placeholder="username" />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            {error && (
              <p className="text-red-500 text-sm mt-1">
                {typeof error === "object" && error !== null && "message" in error
                  ? (error as { message: string }).message
                  : String(error)}
              </p>
            )}
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
            <Button type="submit" className="cursor-pointer">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
