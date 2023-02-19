import AuthModal from "@/components/Modal/Auth/AuthModal";
import { AddIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import { auth } from "@/firebase/clientApp";
import { signOut, User } from "firebase/auth";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex justify={"center"} align={"center"}>
      <AuthModal />
      {user ? (
        <>
          <AddIcon color={"gray.100"} />
          <UserMenu user={user} />
        </>
      ) : (
        <AuthButtons />
      )}
    </Flex>
  );
};
export default RightContent;
