"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BentoGridDemo() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center px-4">
        <div className="w-full md:w-7/12 "></div>

        <ScrollArea className="w-full md:w-5/12 md:h-[80vh] overflow-scroll px-4 md:px-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                deserunt ratione, repellendus omnis earum qui nesciunt quisquam
                neque laudantium nulla numquam modi odit veniam est maxime
                magni. Minima perspiciatis officia vitae cupiditate! Porro
                voluptates molestias corrupti veritatis cupiditate quod
                blanditiis nostrum exercitationem qui possimus ratione quos
                harum eum, non dolorum in quisquam. Nisi tenetur nesciunt dolore
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                deserunt ratione, repellendus omnis earum qui nesciunt quisquam
                neque laudantium nulla numquam modi odit veniam est maxime
                magni. Minima perspiciatis officia vitae cupiditate! Porro
                voluptates molestias corrupti veritatis cupiditate quod
                blanditiis nostrum exercitationem qui possimus ratione quos
                harum eum, non dolorum in quisquam. Nisi tenetur nesciunt dolore
                impedit quae voluptatum iusto id voluptatem, voluptas libero,
                facere deserunt assumenda perspiciatis. Suscipit sint fuga
                molestiae similique delectus a consequatur, dolorem praesentium
                non blanditiis. Ipsam similique non fugiat, dicta harum
                exercitationem enim, pariatur distinctio corporis blanditiis
                repellat quod necessitatibus qui, optio in impedit. Provident
                molestiae iusto ullam, assumenda illum, quibusdam rem cum et
                nobis, optio sunt possimus veniam nisi impedit a! Quia ad iste
                sunt aperiam accusantium, rem minus, non laborum cupiditate,
                ipsam perspiciatis beatae veniam! Eveniet nemo earum esse autem
                vitae omnis ex. Voluptate quisquam voluptatibus officiis itaque
                iusto perferendis molestias sit vitae aliquam repellendus natus
                fuga id nihil fugiat corrupti, praesentium voluptatum quia dicta
                laboriosam eos ex. Eum aspernatur nobis velit id harum eaque, et
                perspiciatis assumenda nam, dignissimos qui unde cupiditate
                suscipit optio perferendis similique sint, ex laborum ratione
                iste quasi officiis tempora? Similique esse expedita harum
                ducimus autem aut voluptas? Yes. It adheres to the WAI-ARIA
                design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </div>
    </>
  );
}
