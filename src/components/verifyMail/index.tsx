"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { POST } from "@/config/axios/requests";
import { sendOtp, verifyOtp } from "@/config/axios/Breakpoints";

type Props = {
  verify: () => void;
  session: any;
};

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().optional(),
});

const VerifyMail = ({ verify, session }: Props) => {
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (otpSent) {
        const { response } = await POST(
          verifyOtp,
          { email: data.email, otp: data.otp },
          {
            Authorization: `Bearer ${session.accessToken as string}`,
          }
        );
        if (response?.status === 200) {
          verify(); // Call verify function from props
        }
      } else {
        const { response } = await POST(
          sendOtp,
          { email: data.email },
          {
            Authorization: `Bearer ${session.accessToken as string}`,
          }
        );
        if (response?.status === 200) {
          setOtpSent(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="verify your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!otpSent && (
          <div className="w-full flex justify-center items-center">
            <Button type="submit">Send OTP</Button>
          </div>
        )}

        {otpSent && (
          <>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center items-center">
              <Button type="submit">Verify OTP</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default VerifyMail;
