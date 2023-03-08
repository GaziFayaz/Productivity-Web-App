import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {<Navbar />}
      <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
        {user ? (
          <>
            <Sidebar />
            <main>{children}</main>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
};
export default Layout;
