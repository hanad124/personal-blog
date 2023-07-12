import axios from "axios";
import { useRef } from "react";
import Header from "@/components/header/Header";
import PostPreview from "@/components/PostsIntro";
import variables from "../styles/variables.module.scss";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import AllPosts from "@/components/AllPosts";
import SearchModal from "@/components/SearchModal";
import { useState } from "react";
import { useRouter } from "next/router";
import readingTime from "reading-time";
import { format } from "date-fns";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Posts({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  const router = useRouter();

  function clearUrl() {
    router.push("/", undefined, { shallow: true, replace: true });
  }

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setFilteredPosts([]);
      return;
    }
    setLoading(true);
    const response = await axios.get(
      `http://127.0.0.1:1337/api/posts?filters[content][$contains]=${e.target.value}&filters[title][$contains]=${e.target.value}&populate=*`
    );
    const data = response.data;
    setFilteredPosts(data.data);
    setLoading(false);
  };

  const handleModalOpen = (mld) => {
    if (mld) {
      setModalOpen(true);

      if (searchInputRef.current !== null) {
        searchInputRef.current.focus();
      }
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} handleMdlOpen={handleModalOpen} />

      <div>
        <SearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Start typing to search"
            onChange={handleSearch}
            className="w-full border border-[#1E293B] py-3 px-4 pl-10 focus:outline-none focus:border-[#6c63ff] bg-transparent rounded-3xl text-[#fff] placeholder:text-slate-400 font-medium"
          />

          <div className="max:h-[200px] overflow-y-scroll">
            {loading ? (
              <div className="flex flex-col mt-7 ml-5">
                <SkeletonTheme baseColor="#1b2342" highlightColor="#444">
                  <Skeleton width={900} height={20} count={1} />
                  <Skeleton width={600} height={20} count={1} />
                  <Skeleton width={620} height={20} count={1} />
                  <br />
                </SkeletonTheme>
              </div>
            ) : (
              <>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => {
                    let date = new Date(post.attributes.date);
                    let postDate = format(date, "MMMM d, yyyy");
                    let readingTimeText = readingTime(
                      post.attributes.content
                    ).text;
                    return (
                      <Link
                        href={`/posts/${post.attributes.slug}`}
                        onClick={clearUrl}
                      >
                        <div className="">
                          <div
                            className={`${variables.search_posts} mt-7 ml-5 flex justify-between border-b border-[#3f475d6d] py-2`}
                          >
                            <div className="flex flex-col gap-2">
                              <h1 className="text-white text-2xl font-bold">
                                {post.attributes.title}
                              </h1>
                              <div className="flex items-center gap-4 text-[#94a3b8] font-medium">
                                <p>{postDate}</p>
                                <p>{readingTimeText}</p>
                              </div>
                              <p key={post.id} className="text-[#94a3b8]">
                                {post.attributes.author}
                              </p>
                            </div>
                            {post.attributes.thumbnail.data.map((thumb) => {
                              console.log(
                                "http://localhost:1337" + thumb.attributes.url
                              );
                              return (
                                <img
                                  src={
                                    "http://localhost:1337" +
                                    thumb.attributes.url
                                  }
                                  alt="image desc"
                                  className="w-[14rem] h-[7rem] rounded-md"
                                />
                              );
                            })}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-center text-white mt-[3rem]">
                    No posts found.
                  </p>
                )}
              </>
            )}
          </div>
        </SearchModal>
      </div>
      <div className="flex flex-wrap gap-y-4 justify-center mt-[4rem]">
        <AllPosts posts={posts} key={posts.key} />
      </div>
    </>
  );
}

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
