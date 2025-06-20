import Link from "next/link";
import React from "react";

const FooterLinks = ({ title, href }) => {
  const linkClass =
    "flex text-base text-slate-600 dark:text-slate-300 transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-600 dark:focus:text-blue-600 ";

  return (
    <li>
      <Link href={href} title={title.toUpperCase()} className={linkClass}>
        {title}
      </Link>
    </li>
  );
};

export default FooterLinks;
