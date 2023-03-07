import { AddIcon } from "@chakra-ui/icons";
import { Flex, Grid, Icon, Link, Spacer, Text } from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { MdAssignment, MdCalendarToday } from "react-icons/md";

function Sidebar() {
  return (
    <Flex
      w={"25%"}
      flexDir="column"
      alignItems="left"
      backgroundColor="#FAFAFA"
      // color="#fff"
      pl={5}
    >
      <Grid>
        <Grid align="flex-start" justifyContent="left" paddingTop="10">
          <Flex className="sidebar-items">
            <Link>
              <Icon as={FaInbox} color="blue.400" fontSize="20" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Inbox</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" paddingTop="2">
            <Link>
              <Icon as={MdAssignment} color="green.400" fontSize="22" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Today</Text>
            </Link>
          </Flex>

          <Flex className="sidebar-items" paddingTop="2">
            <Link>
              <Icon as={MdCalendarToday} color="purple.500" fontSize="19" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Upcoming</Text>
            </Link>
          </Flex>
        </Grid>

        {/* personal projects */}
        <Flex className="projects" paddingTop="10">
          <Link _hover={{ textDecor: "none" }}>
            <Text fontSize="md">Projects</Text>
          </Link>
          <Spacer />
          <Link>
            <AddIcon color={"gray.500"} />
          </Link>
        </Flex>
        <Grid pt={2} pl={2}>
          <Link>
            <Flex justifyContent={"left"} alignItems={"center"}>
              <FiCircle className="projectColor" fill="#AAAAAA" color="white" />
              <Text className="projectName" pl={2}>Education</Text>
              <Spacer />
              <Text className="projectTaskCount" color={"gray.400"} fontSize={"sm"} >3</Text>
            </Flex>
          </Link>
        </Grid>
      </Grid>
    </Flex>
  );
}

export default Sidebar;
