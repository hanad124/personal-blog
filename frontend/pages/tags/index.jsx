import Header from "@/components/header/Header";
import axios from "axios";
import { HiTag } from "react-icons/hi";

const Tags = ({ posts }) => {
  
  return (
    <>
      <Header />
      <div className=" relative mt-16 mx-56 h-[40rem]">
        <div>
          <h1 className="text-white text-xl font-bold">Tags</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-5 text-white mt-7">
            {posts.map((post) => {
              // console.log("TAGS: ", post.attributes.tags.tags.length);
              return post.attributes.tags.tags.map((tag) => {
                const apiUrl = `http://localhost:1337/api/posts?filters[tags][$contains]=${tag.name}&populate=*`;

                axios
                  .get(apiUrl)
                  .then(function (response) {
                    // handle success
                    console.log("TAGS: ", response.data);
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                  });
                return (
                  <div className="flex flex-col gap-3">
                    <p className=" bg-[#1e293b] px-3 py-2 rounded-sm cursor-pointer flex items-center gap-2">
                      <HiTag className="text-[#23ba9e] " />
                      <p>{tag.name}</p>
                    </p>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;

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
