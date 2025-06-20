import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
} from "lucide-react";
import { TiktokIcon } from "./Icons/Tiktok";

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  github: Github,
};

export const SocialLinks = ({ socialMedia }) => {
  return (
    <ul className="flex items-center space-x-3">
      {socialMedia.map((media) => {
        const title = media.title.toLowerCase();
        let Icon = iconMap[title];

        if (title === "tiktok") Icon = TiktokIcon;

        if (!Icon) return null;

        return (
          <li key={title}>
            <a
              href={media.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${media.title} page`}
              className="flex items-center justify-center text-gray-500 rounded-full w-7 h-7 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-blue-700 dark:hover:text-slate-100"
            >
              <Icon className="w-4 h-4" />
              <span className="sr-only">{media.title} page</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
