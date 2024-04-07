import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <>
      <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex sm:flex-col w-full ">
        <div className="p-4">
          <img
            className="rounded-t-xl object-contain object-center w-full h-20 block"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <div className="p-2 pb-4">
          <a href="#">
            <p className="sm:text-md mb-2 md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </p>
          </a>
          <div className="md:h-[100px] w-full overflow-hidden mb-4">
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-400 white hidden md:block">
              {parse(String(content))}
            </p>
          </div>
          <Link
            to={`/post/${$id}`}
            className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800 sm:text-xs hover:scale-110 hover:transition"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostCard;
