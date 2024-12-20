import React, { CSSProperties } from "react";


const RenderIconOrImg = ({ icon, style }: { icon: React.ReactNode, style?: CSSProperties }) => {
  console.log("RenderIconOrImg", icon);
  if (typeof icon === "string") {
    if (icon.startsWith("http")) {
      return (
        <img
          src={icon}
          width={16}
          height={16}
          style={style}
          className="bg-center bg-no-repeat border-none bg-cover"
          alt="icon"
        />
      );
    } else {
      return <span style={{ marginRight: "10px" }}>{icon}</span>;
    }
  }
  else if (typeof icon === "function") {
    return <span>{React.createElement(icon)}</span>;
  }
  else {
    return <span>{icon}</span>;
  }
};

export default RenderIconOrImg;