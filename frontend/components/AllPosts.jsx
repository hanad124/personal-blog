import { useEffect, useState } from "react";
import PostsIntro from "./PostsIntro";
import FirstPostIntro from "./FirstPostIntro";
import LatestPosts from "./LatestPosts";
import variables from "../styles/variables.module.scss";
import SpotCard from "./SpotCard";

const AllPosts = ({ posts }) => {
  useEffect(() => {}, [posts]);
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.attributes.date).getTime();
    const dateB = new Date(b.attributes.date).getTime();
    return dateB - dateA; // sort by date in descending order
  });
  const filteredPosts = sortedPosts.filter((post) => {
    const postDate = new Date(post.attributes.date).getTime();
    const today = new Date().getTime();
    const oneWeekAgo = today - 7 * 24 * 60 * 60 * 1000; // date one week ago
    return postDate; // filter posts created in the last week
  });

  const renderPostsIntro = () => {
    return <PostsIntro posts={filteredPosts} key={filteredPosts.id} />;
  };

  const renderFirstPostIntro = () => {
    return <FirstPostIntro posts={filteredPosts} key={filteredPosts.id} />;
  };

  const renderLatestPosts = () => {
    return <LatestPosts posts={filteredPosts} key={filteredPosts.id} />;
  };

  return (
    <div className=" lg:pl-48 lg:pr-28 overflow-x-hidden ">
      <div className="flex flex-row gap-14">
        <div className="">{renderFirstPostIntro()}</div>
        <div className="">{renderPostsIntro()}</div>
      </div>
      <div className={`${variables.allPosts} mt-36 relative `}>
        <div className="absolute -top-1 text-slate-400 w-14 h-1 bg-slate-400"></div>
        <p className=" absolute -top-9 text-slate-400">LATEST POSTS</p>
        {/* <SpotCard /> */}
        {renderLatestPosts()}
      </div>
    </div>
  );
};

export default AllPosts;
