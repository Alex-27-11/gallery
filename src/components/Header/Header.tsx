import React from "react";
import { ReactComponent as Logo } from "../../assets/mobil/logo.svg";
import { ReactComponent as Sun } from "../../assets/mobil/sun.svg";
import cl from "./Header.module.scss";

const HeadAI: React.FunctionComponent = () => {
  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.hasAttribute("theme")) {
      root.removeAttribute("theme");
    } else {
      root.setAttribute("theme", "dark");
    }
  };

  return (
    <div className={cl.header}>
      <div className="container">
        <div className={cl.inner}>
          <div className={cl.logo}>
            <Logo className={cl.logo} />
          </div>
          <button className={cl.btn} type="button" onClick={toggleTheme}>
            <Sun className={cl.sun} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadAI;
