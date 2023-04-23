import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlinePlusSquare } from "react-icons/ai";

export const SideBarData = [
  {
    id: 1,
    label: "Home",
    icon: <AiFillHome size={20} />,
    path: "/home/",
  },
  {
    id: 2,
    label: "Search",
    icon: <IoSearchSharp size={20} />,
    path: "/home/search",
  },
  {
    id: 3,
    label: "Create",
    icon: <AiOutlinePlusSquare size={20} />,
    path: "/home/create",
  },
  {
    id: 4,
    label: "Profile",
    icon: <CgProfile size={20} />,
    path: "/home/profile",
  },
];
