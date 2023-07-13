import Link from "next/link";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiBookOpen } from "react-icons/bi";
import readingTime from "reading-time";
import { format } from "date-fns";

const LatestPosts = ({ posts }) => {
  const selectedArr = [];
  selectedArr.push(...posts.slice(3));

  console.log("LATEST POSTS: ", selectedArr);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="relative z-0 flex flex-col py-10">
        {selectedArr.length > 0 ? (
          selectedArr.map((post) => {
            let date = new Date(post.attributes.date);
            let postDate = format(date, "MMMM d, yyyy");
            let readingTimeText = readingTime(post.attributes.content).text;
            return (
              <div className="lg:w-[78rem] flex lg:h-[18rem]">
                <div className="">
                  {post.attributes.thumbnail.data.map((thumb) => {
                    return (
                      <Link href={`/posts/${post.attributes.slug}`}>
                        {thumb ? (
                          <img
                            src={"http://localhost:1337" + thumb.attributes.url}
                            className="rounded-t-[10px] h-[224px] max-h-[224px] relative z-10 lg:w-[400px] lg:max-w[400px] sm:w-full border rounded-lg border-slate-800 hover:transform hover:opacity-75 transition duration-300"
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
                    <h1 className="post-title lg:text-[18px] font-bold mb-2 cursor-pointer hover:text-slate-400 ml-3">
                      {post.attributes.title ? (
                        post.attributes.title.slice(0, 91) +
                        (post.attributes.title.length > 91 ? " ..." : "")
                      ) : (
                        <Skeleton width={200} />
                      )}
                    </h1>
                  </Link>
                  <p className="post-subtitle text-secondarycolor my-4 font-extralight ml-3 text-[17px] leading-7 text-[#94a3b8] w-[40rem]">
                    {post.attributes.content ? (
                      post.attributes.content.slice(0, 100) +
                      (post.attributes.content.length > 100 ? " ..." : "")
                    ) : (
                      <Skeleton count={3} />
                    )}
                  </p>
                  <div className="flex gap-4 items-center ml-3 mt-3">
                    {post.attributes.author_image.data.map((avatar) => {
                      return (
                        <img
                          src={
                            avatar ? (
                              "http://127.0.0.1:1337" + avatar.attributes.url
                            ) : (
                              <Skeleton circle={true} height={40} width={40} />
                            )
                          }
                          alt="Description of image"
                          width={100}
                          height={100}
                          className="border-solid border-2 border-slate-400 rounded-full w-8 h-8 cursor-pointer"
                        />
                      );
                    })}
                    <div className="">
                      <p className="text-[#94a3b8] font-bold">
                        {post.attributes.author ? (
                          post.attributes.author
                        ) : (
                          <Skeleton width={100} />
                        )}
                      </p>
                      <div className="flex justify-center gap-5 text-md font-sm">
                        <div className="flex gap-2 items-center text-[#94a3b8]">
                          <BiBookOpen className="" />
                          <p className="text-[#94a3b8]">
                            {readingTimeText ? (
                              readingTimeText
                            ) : (
                              <Skeleton width={50} />
                            )}
                          </p>
                        </div>
                        <div className="dot"></div>
                        <p className="text-[#94a3b8]">
                          {postDate ? postDate : <Skeleton width={100} />}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Skeleton height={400} />
        )}
      </div>
    </SkeletonTheme>
  );
};

export default LatestPosts;
