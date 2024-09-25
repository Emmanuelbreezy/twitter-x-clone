import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <Fragment>
      <Header showBackArrow>
        <Input type="text" placeholder="Search" />
      </Header>
    </Fragment>
  );
};

export default Search;
