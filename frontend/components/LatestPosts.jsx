import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  selectedArr.push(...posts.slice(3, numPosts));

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
        className="relative z-0 flex flex-col py-10"
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
              <motion.div
                className="lg:w-[78rem] flex lg:h-[18rem]"
                variants={postVariants}
              >
                <div className="">
                  {post.attributes.thumbnail.data.map((thumb) => {
                    return (
                      <Link href={`/posts/${post.attributes.slug}`}>
                        {thumb ? (
                          <motion.img
                            src={"http://localhost:1337" + thumb.attributes.url}
                            className="rounded-t-[10px] h-[224px] max-h-[224px] relative z-10 lg:w-[400px] lg:max-w[400px] sm:w-full border rounded-lg border-slate-800 hover:transform hover:opacity-75 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                          />
                        ) : (
                          <Skeleton height={224} />
                        )}
                      </Link>
                    );
                  })}
                </div>
                <div className="ml-6">
                  <Link href={`/posts/${post.attributes.slug}`}>
                    <motion.h1
                      className="post-title lg:text-[18px] font-bold mb-2 cursor-pointer hover:text-slate-400 ml-3"
                      whileHover={{ color: "#61dafb" }}
                    >
                      {post.attributes.title ? (
                        post.attributes.title.slice(0, 91) +
                        (post.attributes.title.length > 91 ? " ..." : "")
                      ) : (
                        <Skeleton width={200} />
                      )}
                    </motion.h1>
                  </Link>
                  <motion.p
                    className="post-subtitle text-secondarycolor my-4 font-extralight ml-3 text-[17px] leading-7 text-[#94a3b8] w-[40rem]"
                    whileHover={{ color: "#61dafb" }}
                  >
                    {post.attributes.content ? (
                      post.attributes.content.slice(0, 100) +
                      (post.attributes.content.length > 100 ? " ..." : "")
                    ) : (
                      <Skeleton count={3} />
                    )}
                  </motion.p>
                  <motion.div
                    className="flex gap-4 items-center ml-3 mt-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center gap-5 items-center ml-3 mt-3">
                      {post.attributes.author_image.data.map((avatar) => {
                        return (
                          <motion.img
                            src={
                              avatar ? (
                                "http://127.0.0.1:1337" + avatar.attributes.url
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
                      <div className="">
                        <motion.p
                          className="text-[#94a3b8] font-bold"
                          whileHover={{ color: "#61dafb" }}
                        >
                          {post.attributes.author ? (
                            post.attributes.author
                          ) : (
                            <Skeleton width={100} />
                          )}
                        </motion.p>
                        <motion.div
                          className="flex justify-center gap-5 text-md font-sm"
                          whileHover={{ color: "#61dafb" }}
                        >
                          <div className="flex gap-2 items-center text-[#94a3b8]">
                            <BiBookOpen className="" />
                            <motion.p
                              className="text-[#94a3b8]"
                              whileHover={{ color: "#61dafb" }}
                            >
                              {readingTimeText ? (
                                readingTimeText
                              ) : (
                                <Skeleton width={50} />
                              )}
                            </motion.p>
                          </div>
                          <div className="dot"></div>
                          <motion.p
                            className="text-[#94a3b8]"
                            whileHover={{ color: "#61dafb" }}
                          >
                            {postDate ? postDate : <Skeleton width={100} />}
                          </motion.p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <Skeleton height={400} />
        )}
        <div className="flex justify-center">
          {numPosts < posts.length && (
            <motion.button
              className="bg-slate-800 w-40 flex items-center gap-2 hover:bg-slate-700 text-white font-md py-2 px-4 rounded mt-6"
              onClick={() => setNumPosts(numPosts + 3)}
              whileHover={{ scale: 1.05 }}
            >
              <HiOutlineRefresh className="text-xl" />
              <p>Load More</p>
            </motion.button>
          )}
        </div>
      </motion.div>
    </SkeletonTheme>
  );
};

export default LatestPosts;
