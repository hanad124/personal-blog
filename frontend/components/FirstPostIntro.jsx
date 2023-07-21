import Link from "next/link";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiBookOpen } from "react-icons/bi";
import readingTime from "reading-time";
import { marked } from "marked";
import parse from "html-react-parser";
import { format } from "date-fns";

const FirstPost = ({ posts }) => {
  const firstPost = posts[0];

  const dateString = firstPost.attributes.date;
  const date = new Date(dateString);
  const postDate = format(date, "MMMM d, yyyy");

  const readingTimeText = readingTime(firstPost.attributes.content).text;

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="basis-1/2 relative z-0">
        {Object.keys(firstPost).length > 0 ? (
          <div className="lg:w-[885px]  lg:h-[46rem]">
            <div className="">
              {firstPost.attributes.thumbnail.data.map((thumb) => {
                return (
                  <Link href={`/posts/${firstPost.attributes.slug}`}>
                    <img
                      src={"http://localhost:1337" + thumb.attributes.url}
                      className="rounded-t-[10px]  h-[495px] max-h-[495px] relative z-10 w-full border rounded-lg border-slate-800  hover:transform hover:opacity-80 transition duration-300"
                    />
                  </Link>
                );
              })}
            </div>
            <div className="">
              <Link href={`/posts/${firstPost.attributes.slug}`}>
                <h1 className="post-title lg:text-[36px] font-bold mb-2 cursor-pointer hover:text-slate-400  ml-3 leading-10 ">
                  {firstPost.attributes.title}
                </h1>
                <p className="post-subtitle text-secondarycolor my-4 font-extralight ml-3 text-[17px] leading-6 text-[#94a3b8] ">
                  {firstPost.attributes.content.slice(0, 248)}
                  {firstPost.attributes.content.length > 248 && " ..."}
                </p>
              </Link>
            </div>
            <div className="flex gap-4 items-center  ml-3 mt-5">
              {firstPost.attributes.author_image.data.map((avator) => {
                return (
                  <img
                    src={
                      "http://127.0.0.1:1337" + avator.attributes.url || (
                        <Skeleton />
                      )
                    }
                    alt="Description of image"
                    width={100}
                    height={100}
                    className="border-solid	border-2 border-slate-400 rounded-full w-8 h-8 cursor-pointer"
                  />
                );
              })}
              <div className="">
                <p className="text-[#94a3b8] font-bold">
                  {firstPost.attributes.author || <Skeleton />}
                </p>
                <div className="flex justify-center gap-5 text-md font-sm">
                  <div className="flex gap-2 items-center text-[#94a3b8]">
                    <BiBookOpen className="" />
                    <p className="text-[#94a3b8]">{readingTimeText}</p>
                  </div>
                  <div className="dot"></div>
                  <p className="text-[#94a3b8]">{postDate}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton height={400} />
        )}
      </div>
    </SkeletonTheme>
  );
};

export default FirstPost;
