import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { SlHome } from "react-icons/sl";

type HomeButtonProps = {
  // user
};

const HomeButton: React.FC<HomeButtonProps> = () => {
  return (
    <Flex align={"center"}>
      <Icon as={SlHome} color="gray.100" fontSize={"20px"} mr={"10px"} />
    </Flex>
  );
};
export default HomeButton;
