import React, { useState, useEffect } from "react";
import { Container, PostCard, Loader, Button } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      appwriteService
        .getPosts([])
        .then((post) => {
          if (post) {
            setPosts(post.documents);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }, 2000);

    return () => clearTimeout(loadingDelay);
  }, []);

  const handleAddPostClick = () => {
    navigate("/add-post");
  };

  return (
    <div className="w-full p-8 mb-8">
      <div>
        <h1 className="text-[2rem] md:text-[2.5rem] text-center font-bold pb-8 text-blue-800">
          All Posts
        </h1>
      </div>
      <Container>
        {loading ? (
          <div className="flex items-center justify-center mt-40 mb-40">
            <Loader />
          </div>
        ) : posts.length > 0 ? (
          <div className="flex flex-wrap flex-row justify-center items-center">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/3 xl:w-1/4 md:m-3"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl mb-6">Nothing to Show</h2>
            {authStatus ? (
              <Button
                onClick={handleAddPostClick}
                className="text-white font-weight-400 bg-customPink rounded-full shadow-lg duration-200 hover:cursor-pointer hover:bg-white hover:text-black hover:scale-105 bg-blue-800 mb-40"
              >
                Add Post
              </Button>
            ) : (
              <Button
                to="/signup"
                className=" text-white font-weight-400 bg-customPink rounded-full shadow-lg duration-200 hover:cursor-pointer hover:bg-white hover:text-black hover:scale-105 bg-blue-800"
              >
                Signup
              </Button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
