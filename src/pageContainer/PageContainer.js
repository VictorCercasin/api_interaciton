import React from "react";
import "./pageContainer.css";

const PageContainer = props => {
  return (
    <div className="page-frame">
      <div className="page-container">
        {props.children}
      </div>
    </div>
  );
};

export default PageContainer;
