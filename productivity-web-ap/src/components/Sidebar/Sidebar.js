import { AddIcon } from "@chakra-ui/icons";
import { Flex, Grid, Icon, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaInbox } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { RiInboxFill, RiCalendar2Line } from "react-icons/ri";
import { MdAssignment, MdCalendarToday } from "react-icons/md";

function Sidebar() {
  return (
    <Flex
      w={"20%"}
      flexDir="column"
      alignItems="left"
      backgroundColor="#FAFAFA"
      // color="#fff"
      pl={5}
    >
      <Flex flexDir={"column"}>
        <Flex flexDir={"column"} align="flex-start" justifyContent="left" paddingTop="10">
          <Flex className="sidebar-items" >
            <Link href="">
              <Icon as={RiInboxFill} color="blue.400" fontSize="22" />
            </Link>
            <Link href="" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Inbox</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" paddingTop="2">
            <Link href="">
              <Icon as={MdAssignment} color="green.400" fontSize="22" />
            </Link>
            <Link href="" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Today</Text>
            </Link>
          </Flex>

          <Flex className="sidebar-items" paddingTop="2">
            <Link href="">
              <Icon as={RiCalendar2Line} color="purple.500" fontSize="21" />
            </Link>
            <Link href="" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Upcoming</Text>
            </Link>
          </Flex>
        </Flex>

        {/* personal projects */}
        <Flex className="projects" paddingTop="10">
          <Link href="" _hover={{ textDecor: "none" }}>
            <Text fontSize="md">Projects</Text>
          </Link>
          <Spacer />
          <Link href="">
            <AddIcon color={"gray.500"} />
          </Link>
        </Flex>
        <Flex flexDir={"column"} pt={2} pl={2}>
          <Link href={"/projects/project"}>
            <Flex justifyContent={"left"} alignItems={"center"}>
              <FiCircle className="projectColor" fill="#AAAAAA" color="white" />
              <Text className="projectName" pl={2}>Education</Text>
              <Spacer />
              <Text className="projectTaskCount" color={"gray.400"} fontSize={"sm"} >3</Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
