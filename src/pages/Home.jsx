import React, { useState, useEffect } from "react";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const name = useSelector((state) => state.auth.userData?.name);
  const status = useSelector((state) => state.auth.status);

  const [profileName, setProfileName] = useState("Stranger");

  useEffect(() => {
    if (status) {
      setProfileName(name);
    } else {
      setProfileName("Stranger");
    }
  }, [status]);

  return (
    <div className="w-full pb-8">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Container>
        <div className="container mx-auto flex flex-col items-center px-4 pb-10 pt-12 sm:py-16 text-center md:py-24 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl text-gray-700 font-bold leading-none sm:text-5xl ">
            <span className="text-cyan-400 capitalize ">
              {" "}
              Hi {profileName}!
            </span>{" "}
            <br />
          </h1>
          <h3 className="md:text-4xl mt-4 text-gray-700 font-bold leading-none sm:text-2xl ">
            Welcome to Daily Byte
          </h3>
          <p className="px-8 mt-8 mb-12 font-semibold text-lg">
            Unlock boundless knowledge with DailyByte, where every login opens
            doors to enlightenment.
          </p>
          <p className="px-8 mt-1 mb-6 font-semibold text-lg">
            Join us on a journey of discovery, one click at a time.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to={status ? "/all-posts" : "/signup"}
              className="px-6 py-2 m-2 border-2 hover:border-gray-600 duration-200 text-lg font-semibold hover:bg-cyan-200 sm:rounded-lg"
            >
              {status ? "Read Blog" : "SignUp"}
            </Link>
            <Link
              to={status ? "/add-post" : "/login"}
              className="px-6 py-2 m-2 text-lg font-semibold text-white duration-200 hover:text-cyan-200 sm:rounded-lg bg-gray-800 hover:bg-black"
            >
              {status ? "Post Blog" : "Login"}
            </Link>
          </div>
          {!status && (
            <p className="text-gray-700 font-semibold mt-4">
              Login to Read, Share and Post Blogs
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
