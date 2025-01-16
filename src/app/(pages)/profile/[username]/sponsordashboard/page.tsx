"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet,
  Trophy,
  Users,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {};

const SponsorDashboard = (props: Props) => {
  const [activeBounties] = useState([
    {
      id: 1,
      title: "Smart Contract Audit",
      description: "Comprehensive audit of our DeFi protocol smart contracts",
      reward: "2.5 ETH",
      applications: 12,
      status: "Active",
      daysLeft: 5,
      category: "Security",
      created: "2024-03-20",
    },
    {
      id: 2,
      title: "DeFi Protocol Integration",
      description: "Integrate our protocol with major DeFi platforms",
      reward: "5 ETH",
      applications: 8,
      status: "Active",
      daysLeft: 3,
      category: "Development",
      created: "2024-03-18",
    },
    {
      id: 3,
      title: "Frontend Development",
      description: "Build a responsive dashboard for our DeFi platform",
      reward: "3 ETH",
      applications: 15,
      status: "Draft",
      daysLeft: null,
      category: "Frontend",
      created: "2024-03-15",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };
  return (
    <div className="w-full h-full p-5 space-y-8">
      <div className="flex justify-end items-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Bounty
            </Button>
          </DialogTrigger>
          {/* <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Bounty</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Bounty Title</Label>
                  <Input id="title" placeholder="Enter bounty title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the bounty requirements"
                  className="h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reward">Reward Amount</Label>
                  <div className="relative">
                    <Input id="reward" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Bounty</Button>
            </div>
          </DialogContent> */}
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h3 className="text-2xl font-bold">15.5 Sol</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Bounties</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Applications
              </p>
              <h3 className="text-2xl font-bold">28</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeBounties.map((bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{bounty.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {bounty.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>{bounty.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {/* <Ethereum className="h-4 w-4 mr-1" /> */}
                    {bounty.reward}
                  </div>
                </TableCell>
                <TableCell>{bounty.applications}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(bounty.status)}>
                    {bounty.status}
                  </Badge>
                </TableCell>
                <TableCell>{bounty.created}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default SponsorDashboard;
