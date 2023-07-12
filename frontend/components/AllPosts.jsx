import { useEffect, useState } from "react";
import PostsIntro from "./PostsIntro";
import FirstPostIntro from "./FirstPostIntro";
import LatestPosts from "./LatestPosts";

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
    return postDate > oneWeekAgo; // filter posts created in the last week
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
    <div className=" w-fulllg:mx-52">
      <div className="flex flex-row gap-8">
        <div className="">{renderFirstPostIntro()}</div>
        <div className="">{renderPostsIntro()}</div>
      </div>
      <div className="mt-20 border-t-slate-500 border-t-2 ">
        {renderLatestPosts()}
      </div>
    </div>
  );
};

export default AllPosts;
