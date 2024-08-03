"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { POST } from "@/config/axios/requests";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await POST("/send-email", { email });
      setSuccess(
        "Email sent successfully. Please check your inbox for the OTP."
      );
    } catch (err) {
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await POST("/verify-otp", { email, otp });
      setSuccess("OTP verified successfully!");
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-xl md:text-3xl px-8">Dashboard</h1>
      <div className="overflow-auto h-[80vh] pb-14 md:pb-8 px-8 py-8">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={sendEmail}
          disabled={loading}
          className="btn-primary mt-4"
        >
          {loading ? "Sending..." : "Send Otp"}
        </button>
        <Input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-4"
        />
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="btn-primary mt-4"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-500 mt-4">{success}</div>}
      </div>
    </div>
  );
};

export default Dashboard;
