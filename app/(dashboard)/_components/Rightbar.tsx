import React from "react";
import FollowList from "./FollowList";
import SubscribeAds from "./_common/Subscribeads";

const Rightbar = () => {
  return (
    <aside className="px-0 sticky top-0 py-4 hidden lg:flex min-w-[330px]">
      <div className="w-full flex flex-col gap-3 max-w-[330px]">
        <SubscribeAds />
        <FollowList />
      </div>
    </aside>
  );
};

export default Rightbar;
