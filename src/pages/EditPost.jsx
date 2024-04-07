import React, { useEffect, useState } from "react";
import { Container, PostForm, Loader } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
            setLoading(false);
          }
        });
      } else {
        navigate("/");
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(loadingDelay);
  }, [slug, navigate]);

  return (
    <div className="p-12">
      <h1 className="text-[2rem] md:text-[2.5rem] text-center font-bold pb-8 text-blue-800">
        Edit Post here ↓{" "}
      </h1>

      <Container>
        {loading ? (
          <div className="flex items-center justify-center mt-40 mb-40">
            <Loader />
          </div>
        ) : { post } ? (
          <PostForm post={post} />
        ) : null}
      </Container>
    </div>
  );
}
export default EditPost;
