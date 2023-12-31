import React, { useEffect } from "react";
import axios from "axios";
import Header from "@/components/header/Header";
import { marked } from "marked";
import parse from "html-react-parser";
import readingTime from "reading-time";
import CodeBlock from "@/components/CodeBlock";
import { BiBookOpen } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";
import { HiTag } from "react-icons/hi";
import Markdown from "markdown-to-jsx";
// import { Code } from "bright";

// Code.theme = "dracula";

const PostPage = ({ post }) => {
  const router = useRouter();

  const dateString = post.attributes.date;
  const date = new Date(dateString);
  const postDate = format(date, "MMMM d, yyyy");

  const body = marked.parse(post.attributes.content);
  const content = parse(body, {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        return <CodeBlock code={domNode.children[0].children[0].data} />;
      }
    },
  });
  post.attributes.tags.tags.map((tag) => {
    console.log(tag);
  });

  const readingTimeText = post.readingTime.text;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <Header />
      <ScrollIndicator />
      <div className="text-center relative mt-16">
        <div className="relative">
          <Link href={"/"}>
            <button
              onClick={handleBackClick}
              className="flex justify-center mt-10 absolute left-0 lg:-top-10 lg:left-[30rem] backdrop-blur-2xl bg-slate-700/20 text-white hover:bg-slate-800 transition-colors  px-4 py-2 rounded-md items-center gap-3 sm:-top-12 sm:left-20 max-sm:-top-24 max-sm:left-3"
            >
              <BiChevronLeft className="text-2xl" />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <div className="flex justify-center gap-5 text-lg font-medium mb-5">
          <div className="flex gap-2 items-center text-[#d1d5db]">
            <BiBookOpen className="" />
            <p className="text-[#d1d5db]">{readingTimeText}</p>
          </div>
          <div className="dot"></div>
          <p className="text-[#d1d5db]">{postDate}</p>
        </div>
        <p className="text-[#d1d5db] text-[2rem] mx-3 lg:mx-[15rem] md:mx-[7rem] flex justify-center font-medium">
          {post.attributes.title}
        </p>
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-5">
            {post.attributes.author_image.data.map((thumb) => {
              return (
                <img
                  key={thumb.id}
                  src={"http://localhost:1337" + thumb.attributes.url}
                  className="border-solid border-2 border-slate-400 rounded-full w-10 h-10 cursor-pointer"
                />
              );
            })}

            <div className="text-[#d1d5db] font-medium">
              <p className="text-[#d1d5db]">{post.attributes.author}</p>
              <p className="text-slate-400">{post.attributes.author_career}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 mx-3 lg:mx-[14rem] md:mx-[5rem] [1280]:mx-w-full">
        {post.attributes.thumbnail.data.map((thumb) => {
          return (
            <img
              key={thumb.id}
              src={"http://localhost:1337" + thumb.attributes.url}
              className="rounded-md mb-11 text-center w-full mx-auto h-auto max:h-[2rem]"
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="max-[398px]:w-[22rem] m-auto break-words sm:mx-4">
          <article className="prose prose-slate md:prose-lg lg:prose-xl prose-p:text-slate-200 prose-headings:text-slate-100 prose-img:rounded-xl prose-img:w-[30rem] prose-img:h-[16rem] prose-a:text-blue-400 prose-code:text-[#23ba9e] prose-code:bg-slate-800 prose-code:p-1 prose-code:rounded-md">
            {content}
            {/* <Markdown>{post.attributes.content}</Markdown> */}
          </article>
        </div>
      </div>
      <div className="flex items-center gap-5 text-center justify-center my-11">
        <div className=" flex gap-2 items-center text-[#23ba9e]">
          <HiTag />
          <p>Tags:</p>
        </div>
        {post.attributes.tags.tags.map((tag) => {
          return (
            <>
              <p className="text-white  border border-[#1e293b] hover:border-slate-700 hover:text-[#23ba9e] hover:scale-105 hover:transition-transform px-3 py-2 rounded-md cursor-pointer">
                {tag}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PostPage;

export async function getStaticProps({ params }) {
  const response = await axios.get(
    `http://127.0.0.1:1337/api/posts/${params.slug}`
  );
  const data = response.data;

  const content = data.data.attributes.content;
  const reading = readingTime(content);

  return {
    props: {
      post: {
        ...data.data,
        readingTime: reading,
      },
    },
  };
}

export async function getStaticPaths() {
  const response = await axios.get("http://127.0.0.1:1337/api/posts");
  const paths = response.data.data.map((post) => {
    return { params: { slug: post.attributes.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
