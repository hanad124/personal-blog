import Link from "next/link";
// import { PostMetadata } from "./PostMetadata";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Header from "@/components/header/Header";

const PostsPage = ({ posts }) => {
  // console.log("POST: ", post);
  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center">
        {posts.map((post) => {
          return (
            <div className="post-preview max-w-lg mx-auto relative z-0 h-[426px] max-h-[426px] w-[19rem] rounded-lg mt-0 flex flex-col border border-slate-700  items-end ">
              <div className="relative h-52 w-full">
                {post.attributes.thumbnail.data.map((thumb) => {
                  return (
                    <img
                      src={"http://localhost:1337" + thumb.attributes.url}
                      className="rounded-t-[10px] border-b-2 border-slate-700 h-[195px] max-h-[195px] relative z-10 w-full "
                    />
                  );
                })}
              </div>
              <div className=" flex flex-col">
                <div>
                  <div className="flex gap-4 text-center text-[12px mt-3  ml-2">
                    <p className="post-category uppercase cursor-pointer text-secondarycolor text-xs">
                      {post.attributes.category || <Skeleton />}
                    </p>
                    <div className="dot text-secondarycolor"></div>
                    <p className="post-date text-secondarycolor text-sm">
                      {post.attributes.date || <Skeleton />}
                    </p>
                  </div>
                  <Link href={`/posts/${post.slug}`}>
                    <h1 className="post-title text-xl font-bold mb-2 cursor-pointer hover:underline  ml-2">
                      {post.attributes.title.slice(0, 28)}
                      {post.attributes.title.length > 28 && " ..."}
                    </h1>
                  </Link>
                  <p className="post-subtitle text-secondarycolor text-md mb-4  ml-2">
                    {post.attributes.subtitle.slice(0, 68)}
                    {post.attributes.subtitle.length > 68 && " ..."}
                  </p>
                  <div className="flex gap-4 items-end mb-4 ml-2">
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
                          className="border-solid	border-2 border-slate-400 rounded-full w-10 h-10 cursor-pointer"
                        />
                      );
                    })}
                    <div className="">
                      <p className="text-white">
                        {post.attributes.author || <Skeleton />}
                      </p>
                      <p className="text-slate-400">
                        {post.attributes.author_career || <Skeleton />}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostsPage;

export async function getStaticProps() {
  const response = await axios.get(
    "http://127.0.0.1:1337/api/posts?populate=thumbnail&populate=author_image"
  );
  const data = response.data;

  return {
    props: {
      posts: data.data,
    },
  };
}
