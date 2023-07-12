import Link from "next/link";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiBookOpen } from "react-icons/bi";
import readingTime from "reading-time";
import { marked } from "marked";
import parse from "html-react-parser";
import { format } from "date-fns";

const PostPreview = ({ posts }) => {
  const firstPost = posts[0];

  const selectedArr = [];
  selectedArr.push(...posts.slice(1, 3));


  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="basis-1/4 relative z-0 flex flex-col gap-x-[10rem]">
        {selectedArr.length > 0 ? (
          selectedArr.map((post) => {
            let date = new Date(post.attributes.date);
            let postDate = format(date, "MMMM d, yyyy");
            let readingTimeText = readingTime(post.attributes.content).text;
            return (
              <div className="lg:w-[426px]  lg:h-[26rem]">
                <div className="">
                  {post.attributes.thumbnail.data.map((thumb) => {
                    return (
                      <Link href={`/posts/${post.attributes.slug}`}>
                        <img
                          src={"http://localhost:1337" + thumb.attributes.url}
                          className="rounded-t-[10px]  h-[224px] max-h-[224px] relative z-10 w-full border rounded-lg border-slate-800  hover:transform hover:opacity-75 transition duration-300"
                        />
                      </Link>
                    );
                  })}
                </div>
                <div className="">
                  <Link href={`/posts/${post.attributes.slug}`}>
                    <h1 className="post-title lg:text-[18px] font-bold mb-2 cursor-pointer hover:text-slate-400  ml-3">
                      {post.attributes.title.slice(0, 91)}
                      {post.attributes.title.length > 91 && " ..."}
                    </h1>
                  </Link>
                </div>
                <div className="flex gap-4 items-center ml-3 mt-3">
                  {post.attributes.author_image.data.map((avator) => {
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
                      {post.attributes.author || <Skeleton />}
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
            );
          })
        ) : (
          <Skeleton height={400} />
        )}
      </div>
    </SkeletonTheme>
  );
};

export default PostPreview;
