import { Button } from "@/components/ui/button";
import React from "react";

const SubscribeAds = () => {
  return (
    <div className="bg-background border dark:border-[rgb(47,51,54)] rounded-xl p-4">
      <div className="w-full">
        <h2 className="text-[20px] font-bold">Subscribe to Premium</h2>
        <div className="flex flex-col gap-2">
          <p className="text-[15px] leading-[19px]">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <Button
            type="submit"
            variant="brandPrimary"
            size="brandsm"
            className="
            !h-auto
            !text-white
            cursor-pointer
            font-semibold
            text-base"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeAds;
