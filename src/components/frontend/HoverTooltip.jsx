import React from "react";

const HoverTooltip = ({
  title,
  className = " w-50 top-full ",
}) => {
  return (
      <div
        className={`absolute z-20 left-0 mt-1 hidden ${className} bg-neutral-900 text-gray-200 text-xs px-2 py-0.5 group-hover:block border-t border-l border-r border-slate-400 rounded-[2px]`}
      >
        {title}
      </div>
  
  );
};

export default HoverTooltip;
