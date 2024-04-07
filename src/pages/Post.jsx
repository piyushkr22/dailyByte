import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
            setLoading(false);
          } else {
            navigate("/");
          }
        });
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(loadingDelay);
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/all-posts");
      }
    });
  };

  return (
    <div className=" flex justify-center p-20">
      <div className="max-w-[57rem]">
        <Container>
          {loading ? (
            <div className="flex items-center justify-center mt-40 mb-40">
              <Loader />
            </div>
          ) : post ? (
            <div>
              {isAuthor && (
                <div className="sm:absolute md:absolute md:right-20 md:top-40 z-10 sm:right-4 sm:top-24">
                  <Link to={`/edit-post/${slug}`}>
                    <Button
                      bgColor="bg-green-400"
                      className="mr-3 hover:bg-green-600 hover:text-white hover:scale-125 p-1"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    bgColor="bg-red-500"
                    onClick={deletePost}
                    className=" ml-3 hover:bg-red-600 hover:text-white hover:scale-125"
                  >
                    Delete
                  </Button>
                </div>
              )}
              <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 h-[200px]">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-xl object-contain sm:object-scale-down"
                />
              </div>

              <div className="w-full mb-6">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl font-bold">
                  {post.title}
                </h1>
              </div>
              <div className="browser-css text-left sm:text-sm md:text-lg lg:text-xl antialiased font-normal font-serif">
                {parse(String(post.content))}
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    </div>
  );
}
