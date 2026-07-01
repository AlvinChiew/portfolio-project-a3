import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, onClick, getLinkClick }) => {
  return (
    <ul className=" flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            onClick={(e) => {
              getLinkClick?.(link.path)?.(e);
              onClick?.(e);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
