import React from "react";

const SubRoute = ({ path, name, component: Component }) => {

  return (
    <div>
      {Component && <Component />}
    </div>
  );
};

export default SubRoute;
