import { useEffect, useState } from "react";
import PostsIntro from "./PostsIntro";
import FirstPostIntro from "./FirstPostIntro";

const AllPosts = ({ posts }) => {

  useEffect(() => {
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
  }, [posts]);

  const renderPostsIntro = () => {
    return <PostsIntro posts={posts} key={posts.id} />;
  };

  const renderFirstPostIntro = () => {
    return <FirstPostIntro posts={posts} key={posts.id} />;
  };

  return (
    <div className="flex flex-row w-full gap-8 lg:mx-52">
      <div className="">{renderFirstPostIntro()}</div>
      <div className="">{renderPostsIntro()}</div>
    </div>
  );
};

export default AllPosts;
