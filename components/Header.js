import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCollectionPlay } from "react-icons/bs";

function Header() {
  const [show, setShow] = useState(false);
  const session = useSession();
  console.log("session .....", session);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div
      style={{ backgroundColor: `${show ? "black" : "transparent"}` }}
      className="transition-all duration-1000 flex fixed z-50 top-0 w-full  items-center px-3"
    >
      <div className="flex-1">
        <Image
          width={100}
          height={50}
          src="https://cdn.worldvectorlogo.com/logos/netflix-3.svg"
        />
      </div>

      <div className="cursor-pointer mr-5">
        <BsCollectionPlay className="text-white text-2xl" />
      </div>
      <img
        onClick={() => signOut()}
        width={40}
        height={40}
        src={session[0]?.user?.image}
      />
    </div>
  );
}

export default Header;
