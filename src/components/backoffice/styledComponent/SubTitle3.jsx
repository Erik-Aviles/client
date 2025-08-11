import React from "react";
import PropTypes from "prop-types";

const SubTitle3 = ({ title, className = "font-light italic" }) => {
  return <h3 className={`text-lg md:text-2xl text-slate-800 dark:text-slate-50 ${className}`}>{title}</h3>;
};

// Validación de props
SubTitle3.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default React.memo(SubTitle3);