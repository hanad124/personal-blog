import React from "react";
import axios from "axios";

const TagsPage = ({ tags }) => {
  console.log("TAGS: ", tags);

  return <div>TagsPage</div>;
};

export default TagsPage;

export async function getStaticProps({ params }) {
  const response = await axios.get(
    `http://localhost:1337/api/posts?filters[content][$contains]=${params.tags}&filters[tags][$contains]=${params.tags}&populate=*`
  );
  const data = response.data;

  return {
    props: {
      tags: data,
    },
  };
}

export async function getStaticPaths() {
  const response = await axios.get("http://127.0.0.1:1337/api/posts");
  const paths = response.data.data.map((post) => {
    return { params: { tags: post.attributes.tags } };
  });

  return {
    paths,
    fallback: false,
  };
}
