import AuthModal from "@/components/Modal/Auth/AuthModal";
import { AddIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import { auth } from "@/firebase/clientApp";
import { signOut, User } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import TaskModalIcon from "@/components/Modal/Task/TaskModalIcon";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex justifyItems={"center"} alignItems={"center"}>
      <AuthModal />
      {user ? (
        <Flex alignItems={"center"}>
          {/* add task icon */}

          <TaskModalIcon />
          <UserMenu user={user} />
        </Flex>
      ) : (
        <AuthButtons />
      )}
    </Flex>
  );
};
export default RightContent;
