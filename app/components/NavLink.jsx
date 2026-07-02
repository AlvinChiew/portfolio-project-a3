import Link from "next/link";

const NavLink = ({ href, title, onClick }) => {
  return (
    <Link
      href={href}
      className="text-secondaryText block rounded py-2 pl-3 pr-4 text-center hover:text-white sm:text-xl md:p-0 md:text-start"
      onClick={onClick}
    >
      {title}
    </Link>
  );
};

export default NavLink;
