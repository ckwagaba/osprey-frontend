import React from "react";
import PropTypes from "prop-types";
import "./Avatar.css";

const Avatar = ({ name }) => {
  const nameStringToHslColor = (name) => {
    let hash = 0;
    let i = 0;
    for (i; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
    }
    const h = hash % 360;
    return `hsl(${h}, 30%, 80%)`; // syntax: hsl(h, s%, l%)
  };

  return (
    <div
      className="UserAvatar"
      style={{ backgroundColor: nameStringToHslColor(name), color: "#555" }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
