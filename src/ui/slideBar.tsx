import React from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

interface SidebarOption {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const sidebarOptions: SidebarOption[] = [
  { title: "Home", icon: <FaHome />, link: "/home" },
  { title: "Profile", icon: <FaUser />, link: "/profile" },
  { title: "Settings", icon: <FaCog />, link: "/settings" },
];

export default function SlideBar() {
  return (
    <div className="">
      {" "}
      <ul className="flex flex-col ">
        {sidebarOptions.map((option, index) => (
          <li
            key={index}
            className="flex items-center p-4 space-x-2 hover:bg-gray-200"
          >
            {option.icon}
            <a href={option.link} className="text-base  font-medium ">
              {option.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
