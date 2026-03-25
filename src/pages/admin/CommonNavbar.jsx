import { GiHamburgerMenu } from "react-icons/gi";
import NotificationDropdown from "@/shared/navbar/NotificationDropdown";
import UserDropdown from "@/shared/navbar/UserDropdown";
import { useAuth } from "@/hooks/useAuth";

const CommonNavbar = ({ open, setOpen }) => {
  const { user } = useAuth();
  // console.log(user)
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-6 px-4 sm:px-8 bg-white ">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>
        <div className="flex items-center gap-4">
          <p className=" text-black sm:text-2xl md:text-3xl font-bold">
            {user?.profile?.first_name} {user?.profile?.last_name}
          </p>
        </div>
      </div>

      <div className="flex items-center md:gap-4 gap-2">
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default CommonNavbar;
