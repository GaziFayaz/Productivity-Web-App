import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { SlHome } from "react-icons/sl";

type HomeButtonProps = {
  // user
};

const HomeButton: React.FC<HomeButtonProps> = () => {
  return (
    <Flex align={"center"}>
      <Link href={"/"}>
        <Icon as={SlHome} color="gray.100" fontSize={"20px"} mr={"10px"} />
      </Link>
    </Flex>
  );
};
export default HomeButton;
