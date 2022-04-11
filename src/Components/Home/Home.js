import React from "react";
import Content from "../Content/Content";
import { display } from "../Header/Header";

const Home = ({ data }) => {
  const displayData = display("", data);
  return <Content data={displayData} />;
};

export default Home;
