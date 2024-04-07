import React, { useState } from "react";
import { Container, LogoutBtn, ToggleBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header>
        <Container>
          <nav className="bg-gray-800 rounded-3xl">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-14 sm:h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <ToggleBtn
                    toggle={toggle}
                    onClick={() => setToggle((prev) => !prev)}
                  />
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex sm:ml-0 -ml-8 select-none text-lg text-white font-bold flex-shrink-0 items-center">
                    <Link to="/">
                      <div className="flex">
                        <img
                          src="/Icon.svg"
                          className="h-8 mr-2"
                          alt="Daily Byte Logo"
                        />
                        <p class="self-center text-2xl font-semibold whitespace-nowrap text-blue-600">
                          Daily Byte
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex items-center">
                    <ul className="flex ml-auto">
                      {navItems.map(
                        (item) =>
                          item.active && (
                            <li key={item.name}>
                              <NavLink
                                to={`${item.slug}`}
                                className=" text-white p-6 text-lg font-semibold hover:scale transition duration-500 inline-block px-6 py-2 rounded  md:hover:bg-transparent md:hover:scale-125"
                                aria-current="page"
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {authStatus && (
                    <li className="inline-block text-white font-semibold rounded-full duration-200 hover:cursor-pointer hover:text-black hover:scale-110 bg-blue-800">
                      <LogoutBtn />
                    </li>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile menu, show/hide based on menu state. */}
            <div
              className={`${
                toggle && "max-h-44"
              }  sm:hidden max-h-1 overflow-hidden transition-all duration-500`}
              id="mobile-menu"
            >
              <div className="px-2 py-3">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li className="list-none" key={item.name}>
                        <NavLink
                          to={`${item.slug}`}
                          className=" text-white  block rounded-md hover:bg-gray-700 px-3 py-2  text-base font-medium"
                          aria-current="page"
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
