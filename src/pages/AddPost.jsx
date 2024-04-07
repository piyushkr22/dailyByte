import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { Loader } from "../components";

function AddPost() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(loadingDelay);
  }, []);

  return (
    <div className="p-12">
      <h1 className="text-[2rem] md:text-[2.5rem] text-center font-bold pb-8 text-blue-800">
        Add Post here ↓{" "}
      </h1>

      <Container>
        {loading ? (
          <div className="flex items-center justify-center mt-40 mb-40">
            <Loader />
          </div>
        ) : (
          <PostForm />
        )}
      </Container>
    </div>
  );
}

export default AddPost;
