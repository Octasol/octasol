"use client";
import React from "react";
import { TextGenerateEffect } from "../ui/text-effect";

type Props = {};

const words = `Connecting Your Issues with Solutions`;

const Text = (props: Props) => {
  return <TextGenerateEffect words={words} />;
};

export default Text;
