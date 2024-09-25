import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import DarkModetoggle from "@/components/mode/dark-mode";

const Settings = () => {
  return (
    <Fragment>
      <Header label="Settings" showBackArrow />
      <DarkModetoggle />
    </Fragment>
  );
};

export default Settings;
