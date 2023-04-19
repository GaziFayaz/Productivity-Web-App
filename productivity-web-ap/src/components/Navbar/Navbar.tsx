import { Flex, Image, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import HomeButton from "./HomeButton";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import SearchInput from "./SearchInput";
import SidebarIcon from "./SidebarIcon";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Flex
          bg="brand.100"
          height={"44px"}
          padding={"6px 12px"}
          w="100%"
          // position={"fixed"}
        >
          <SidebarIcon />
          <HomeButton />
          <SearchInput />
          <Spacer />
          <RightContent user={user} />
        </Flex>
      ) : (
        <Flex bg="gray.100" height={"44px"} padding={"6px 12px"}>
          <Flex align={"center"}>
            <Image
              src="/images/logo-no-background.svg"
              height="27px"
              alt="Trackeasy"
            />
          </Flex>
          <Spacer />
          <RightContent />
        </Flex>
      )}
    </>
  );
};
export default Navbar;
