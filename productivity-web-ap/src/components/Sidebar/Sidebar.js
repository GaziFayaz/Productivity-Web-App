import { Flex, Link, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaInbox } from "react-icons/fa";
import { MdAssignment, MdCalendarToday } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

function Sidebar() {
  return (
    <Flex
      w="25%"
      flexDir="column"
      alignItems="center"
      backgroundColor="#FAFAFA"
      // color="#fff"
    >
      <Flex flexDir="column">
        <Flex flexDir="column" align="flex-start" justifyContent="center">
          <Flex className="sidebar-items" paddingTop="20">
            <Link>
              <Icon as={FaInbox} color="#76E4F7" fontSize="md" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Inbox</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" paddingTop="2">
            <Link>
              <Icon as={MdAssignment} color="#68D391" fontSize="md" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Today</Text>
            </Link>
          </Flex>

          <Flex className="sidebar-items" paddingTop="2">
            <Link>
              <Icon as={MdCalendarToday} color="#065666" fontSize="md" />
            </Link>
            <Link _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Upcoming</Text>
            </Link>
          </Flex>
          {/* personal projects */}
          <Flex className="p-projects" paddingTop="10">
            <Flex>
              <Link _hover={{ textDecor: "none" }}>
                <Text fontSize="md">Personal Projects</Text>
              </Link>
              <Link>
                <Icon
                  as={IoIosAddCircleOutline}
                  color="#A0AEC0"
                  fontSize="2xl"
                  marginLeft="1em"
                />
              </Link>
            </Flex>
          </Flex>
          {/* group projects */}
          <Flex className="g-projects" paddingTop="10">
            <Flex>
              <Link _hover={{ textDecor: "none" }}>
                <Text fontSize="md">Group Projects</Text>
              </Link>
              <Link>
                <Icon
                  as={IoIosAddCircleOutline}
                  color="#A0AEC0"
                  fontSize="2xl"
                  marginLeft="1.6em"
                />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
