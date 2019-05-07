import React from "react";
import Menu from "./Menu";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Menu isHomeActive={"active"} />
        Welcome to your home page..
      </div>
    );
  }
}

export default Home;
