import React, { Fragment, ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import Rightbar from "../_components/Rightbar";
import EditProfileModal from "../_components/EditProfileModal";
import { auth } from "@/lib/auth";
//import { useSession } from "next-auth/react";
// import Logo from "@/components/logo";
// import { Spinner } from "@/components/spinner";
// import Logo from "@/components/logo";
// import { Spinner } from "@/components/spinner";

async function MainLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  // if (status === "loading") {
  //   return (`
  //     <div className="flex flex-col h-screen items-center w-full justify-center">
  //       <Logo width="70px" height="70px" />
  //       <Spinner size="icon" />
  //     </div>
  //   );
  // }

  // if (!session?.user?.email) {
  //   return redirect("/");
  // }

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <Fragment>
      <EditProfileModal />
      <div className="h-screen">
        <div className="container h-full mx-auto xl:px-30 max-w-7xl">
          <div className="flex items-start justify-center h-full">
            <div className="shrink-0 flex-[0.1]  lg:flex-[0.28] relative">
              <Sidebar />
            </div>
            <div className="flex flex-row h-screen flex-1 gap-0 lg:gap-8">
              <main className="!bg-background lg:max-w-[600px] relative h-screen flex-1 lg:flex-[0.95] border-x dark:border-[rgb(47,51,54)]">
                <div className="w-full">{children}</div>
              </main>
              <div className="hidden lg:flex shrink-0 relative min-h-[600px]">
                <Rightbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainLayout;
