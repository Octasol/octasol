import React from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import NextButton from "@/components/Button/NextButton";

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

const TabNavigation = ({ onNext, onPrev }: Props) => {
  return (
    <div className="w-full flex justify-between items-center">
      <NextButton onClick={onPrev}>
        <div className="flex gap-2 items-center">
          <ArrowBigLeft size={20} />
          PREV
        </div>
      </NextButton>

      <NextButton onClick={onNext}>
        <div className="flex gap-2 items-center">
          NEXT
          <ArrowBigRight size={20} />
        </div>
      </NextButton>
    </div>
  );
};

export default TabNavigation;
