import React from "react";
import "./pageNotFound.scss";

function PageNotFound() {
  return (
    <div id="not-found">
      <h1>Yikes! Looks like 404</h1> <h2>Apparently no tickets here</h2>
      <a href="/">Back home</a>
    </div>
  );
}

export default PageNotFound;
