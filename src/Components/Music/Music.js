import React from "react";
import Content from "../Content/Content";
import { display } from "../Header/Header";

const Music = ({ data }) => {
  const displayData = display("music", data);
  return <Content data={displayData} />;
};

export default Music;
