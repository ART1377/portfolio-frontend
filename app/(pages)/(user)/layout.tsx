import React from "react";
import { Navigation } from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { ScrollProgress } from "@/app/components/scroll-progress";

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
