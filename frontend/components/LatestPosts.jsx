import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Spotlight from "./Spotlight";
import { SpotlightCard } from "./Spotlight";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiBookOpen } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import readingTime from "reading-time";
import { format } from "date-fns";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 6;

const LatestPosts = ({ posts }) => {
  const [numPosts, setNumPosts] = useState(POSTS_PER_PAGE);
  const selectedArr = [];
  selectedArr.push(...posts.slice(3));

  const pageVariants = {
    initial: {
      opacity: 0,
      y: "-10vh",
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "10vh",
    },
  };

  const postVariants = {
    initial: {
      opacity: 0,
      y: "-10vh",
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    out: {
      opacity: 0,
      y: "10vh",
    },
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <motion.div
        className=" z-0 py-10 lg:w-[110rem] flex flex-wrap gap-10 relative"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {selectedArr.length > 0 ? (
          selectedArr.map((post) => {
            let date = new Date(post.attributes.date);
            let postDate = format(date, "MMMM d, yyyy");
            let readingTimeText = readingTime(post.attributes.content).text;
            return (
              <Spotlight>
                <SpotlightCard className="">
                  <motion.div className="relative h-full lg:w-[30rem] bg-[#131C31] p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                    <div className="">
                      {post.attributes.thumbnail.data.map((thumb) => {
                        return (
                          <Link href={`/posts/${post.attributes.slug}`}>
                            {thumb ? (
                              <img
                                src={
                                  "http://localhost:1337" + thumb.attributes.url
                                }
                                className="rounded-t-[10px] h-[224px] max-h-[224px] relative z-10 w-full border rounded-lg border-slate-800 hover:transform transition duration-300"
                                whileHover={{ scale: 1.05 }}
                              />
                            ) : (
                              <Skeleton height={224} />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="ml-2">
                      <Link href={`posts/${post.attributes.slug}`}>
                        <div className="flex justify-between items-center mt-5">
                          <div className="flex gap-2">
                            {post.attributes.tags.tags
                              .slice(0, 3)
                              .map((tag) => {
                                return (
                                  <>
                                    <p className="text-sm text-slate-500 hover:text-[#23ba9e]">
                                      #
                                      {tag.name.slice(0, 15) +
                                        (tag.name.length > 15 ? " ..." : "")}
                                    </p>
                                  </>
                                );
                              })}
                          </div>
                          <div className="flex gap-2 items-center text-[#94a3b8]">
                            <BiBookOpen className="hover:text-[#23ba9e]" />
                            <p
                              className="text-[#94a3b8] hover:text-[#23ba9e]"
                              whileHover={{ color: "#61dafb" }}
                            >
                              {readingTimeText ? (
                                readingTimeText
                              ) : (
                                <Skeleton width={50} />
                              )}
                            </p>
                          </div>
                        </div>
                        <h1
                          className="post-title lg:text-[22px] font-bold mb-7 cursor-pointer hover:text-[#23ba9e] h-[54px]"
                          whileHover={{ color: "#61dafb" }}
                        >
                          {post.attributes.title ? (
                            post.attributes.title.slice(0, 51) +
                            (post.attributes.title.length > 51 ? " ..." : "")
                          ) : (
                            <Skeleton width={200} />
                          )}
                        </h1>
                      </Link>

                      <div
                        className="flex gap-4 items-center justify-between mt-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex justify-center gap-5 items-center mt-3 flex-end bottom-0">
                          {post.attributes.author_image.data.map((avatar) => {
                            return (
                              <img
                                src={
                                  avatar ? (
                                    "http://127.0.0.1:1337" +
                                    avatar.attributes.url
                                  ) : (
                                    <Skeleton
                                      circle={true}
                                      height={40}
                                      width={40}
                                    />
                                  )
                                }
                                alt="Description of image"
                                width={100}
                                height={100}
                                className="border-solid border-2 border-slate-400 rounded-full w-8 h-8 cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                              />
                            );
                          })}
                          <div className="hover:text-[#23ba9e]">
                            <p
                              className="text-[#94a3b8] font-bold"
                              whileHover={{ color: "#61dafb" }}
                            >
                              {post.attributes.author ? (
                                post.attributes.author
                              ) : (
                                <Skeleton width={100} />
                              )}
                            </p>
                            <div
                              className="flex  gap-5 text-md font-sm"
                              whileHover={{ color: "#61dafb" }}
                            >
                              <p
                                className="text-slate-500 hover:text-[#23ba9e]"
                                whileHover={{ color: "#61dafb" }}
                              >
                                {postDate ? postDate : <Skeleton width={100} />}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button className="text-white  border border-[#1e293b] hover:border-slate-700 hover:text-[#23ba9e] hover:scale-105 hover:transition-transform px-3 py-2 rounded-md cursor-pointer">
                          <Link href={`posts/${post.attributes.slug}`}>
                            Read more
                          </Link>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SpotlightCard>
              </Spotlight>
            );
          })
        ) : (
          <Skeleton height={400} />
        )}
      </motion.div>
    </SkeletonTheme>
  );
};

export default LatestPosts;
