import React from "react";
import { StatDetails } from "../Charts/StatDetails";

type Props = {
  data: {
    githubId: string;
    stars: number;
    forks: number;
    forkedRepos: number;
    originalRepos: number;
    followers: number;
    totalCommits: number;
    repositoriesContributedTo: number;
    pullRequests: number;
    mergedPullRequests: number;
    totalIssues: number;
  };
};

const ProfileDetail = (props: Props) => {
  return (
    <>
      <div className="w-full flex flex-col justify-evenly items-center">
        <div className="w-full flex justify-center items-center">
          {/* <StatDetails /> */}
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
