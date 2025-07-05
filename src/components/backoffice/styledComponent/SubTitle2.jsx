import React from "react";
import PropTypes from "prop-types";

const SubTitle2 = ({ title, className = "" }) => {
  return <h2 className={`text-base md:text-xl font-semibold text-slate-500 dark:text-amber-400 ${className}`}>{title}</h2>;
};

// Validación de props
SubTitle2.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default React.memo(SubTitle2);