"use client";

import { decrement, increment } from "@/app/Redux/Features/loader/loaderSlice";
import { GET } from "@/config/axios/requests";
import { Calendar, DollarSign, User, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Bounty {
  sponsor: {
    name: string;
    image: string;
    description: string;
  };
  submissions: [];
  price: number;
  bountyname: string;
  skills: string[];
  id: number;
  createdAt: string;
}

const Bounty = () => {
  const router = useRouter();
  const counter = useSelector((state: any) => state.counter);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [bounties, setbounties] = useState<Bounty[]>([]);

  const getBounties = async () => {
    try {
      const response = await GET("/unescrowedbounty", {
        Authorization: `Bearer ${user.accessToken}`,
      });
      if (response.status === 200) {
        setbounties(response.bounties);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bountyDetails = (id: number) => {
    router.push(`/bounty/${id}`);
  };

  useEffect(() => {
    console.log(bounties);
  }, [bounties]);

  useEffect(() => {
    console.log("user", user);
    getBounties();
  }, [user]);

  useEffect(() => {
    console.log("counter/b", counter.value);
    if (bounties.length !== 0 && counter.value > 0) {
      dispatch(decrement());
    }
  }, [bounties, counter, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bounties.map((bounty, index) => (
          <Card
            key={index}
            className="hover:shadow-sm transition-shadow duration-500 cursor-pointer bg-black hover:shadow-[#43aa8a]"
            onClick={() => bountyDetails(bounty.id)}
          >
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={bounty?.sponsor?.image}
                      alt={bounty?.sponsor?.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">
                      {bounty?.sponsor?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">Sponsor</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="font-bold">{bounty.price}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold">{bounty?.bountyname}</h2>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {bounty.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} className="bg-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(bounty?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{bounty.submissions.length}</span>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bounty;
