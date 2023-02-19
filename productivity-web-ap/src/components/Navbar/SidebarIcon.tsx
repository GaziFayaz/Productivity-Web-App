import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";

type SidebarIconProps = {
  // user
};

const SidebarIcon: React.FC<SidebarIconProps> = () => {
  return (
    <Flex align={"center"}>
      <HamburgerIcon fontSize={"25"} color="gray.100" mr={"10px"} />
    </Flex>
  );
};
export default SidebarIcon;
