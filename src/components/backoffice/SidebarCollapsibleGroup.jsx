import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cloneElement } from "react";

export const SidebarCollapsibleGroup = ({
  link,
  isOpen,
  toggleOpen,
  pathname,
  activeLink,
  links,
  styles,
  activeLinkDefaul,
  toggleSidebar,
}) => {
  const handleToggle = () => {
    toggleOpen((prev) => (prev === link.name ? null : link.name));
  };
  return (
    <Collapsible key={link.name} open={isOpen === link.name}>
      <CollapsibleTrigger
        onClick={handleToggle}
        className={`${styles} px-6 py-1 ${
          link.href === pathname ? activeLink : ""
        }`}
      >
        <div className={styles}>
          {cloneElement(link.icon, { className: "w-4 h-4" })}
          <span>{link.name}</span>
        </div>
        {isOpen === link.name ? <ChevronDown /> : <ChevronRight />}
      </CollapsibleTrigger>
      <CollapsibleContent
        className="my-2 mx-5 px-3 pl-5 py-2 border border-border dark:bg-slate-800 rounded-lg overflow-hidden
        data-[state=open]:animate-slideDown
        data-[state=closed]:animate-slideUp"
      >
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={toggleSidebar}
              key={item.name}
              href={item.href}
              className={`${styles} text-sm pl-2 py-2 ${
                item.href === pathname ? activeLinkDefaul : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};
