"use client";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { store } from "@/app/Redux/store";
import { setUser } from "@/app/Redux/Features/user/userSlice";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState(false);
  const user = useSelector((state: any) => state.user);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);

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
          store.dispatch(
            setUser({
              ...user,
              isVerifiedEmail: true,
            })
          );
          verify(); 
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
          setCanResend(false);
          setTimer(30); 
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
          setErrorMessage(null); 
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  const handleResendOtp = async () => {
    setCanResend(false);
    setTimer(30); // Reset timer
    setErrorMessage(null); // Clear error message
    const { response } = await POST(
      sendOtp,
      { email: form.getValues("email") },
      {
        Authorization: `Bearer ${session.accessToken as string}`,
      }
    );
    if (response?.status === 200) {
      setOtpSent(true);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-1/3 space-y-6"
      >
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
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

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
            {!canResend && (
              <p className="text-gray-600">Resend OTP in {timer} seconds.</p>
            )}
            {canResend && (
              <div className="w-full flex justify-center items-center">
                <Button onClick={handleResendOtp}>Resend OTP</Button>
              </div>
            )}
          </>
        )}
      </form>
    </Form>
  );
};

export default VerifyMail;
