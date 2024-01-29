import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h4>
        Made by{" "}
        <a
          href="https://github.com/omkar787"
          className="author-name"
          target="_blank"
          rel="noreferrer"
        >
          Omkar
        </a>
        ,{" "}
        <a
          href="https://github.com/Pradnyesh2711"
          className="author-name"
          target="_blank"
          rel="noreferrer"
        >
          Pradnyesh
        </a>

        ,{" "}
        <a
          href="https://github.com/surabhimahale"
          className="author-name"
          target="_blank"
          rel="noreferrer"
        >
          Surabhi
        </a>{" "}
        , and{" "}
        <a
          href="https://github.com/Sandesh"
          className="author-name"
          target="_blank"
          rel="noreferrer"
        >
          Sandesh
        </a>


        for DC PROJECT
      </h4>
    </div>
  );
};

export default Footer;
