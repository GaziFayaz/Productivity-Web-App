import {
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import TaskModalButton from "@/components/Modal/Task/TaskModalButton"

const project = () => {
  return (
    <Flex w="80vw" flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex className="projectContent" flexDir={"column"} w="55vw">
        <Flex className="ProjectHeader" alignItems={"center"}>
          <Text className="ProjectName" fontSize={"larger"} fontWeight={"bold"}>
            Education
          </Text>
          <Spacer />
          <HStack spacing="20px">
            <Flex alignItems={"center"}>
              <Icon as={AiOutlineUserAdd} fontSize="22" color={"gray.500"} />
              <Text pl={0.5} fontSize={12} color={"gray.500"}>
                Share
              </Text>
            </Flex>

            <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
            {/* <Icon as={AiOutlineUserAdd} fontSize="25" color={"gray.500"} />
        <Icon as={AiOutlineUserAdd} fontSize="25" color={"gray.500"} /> */}
          </HStack>
        </Flex>
        <Flex className="projectBody" pr={10} pt={10}>
          <Flex className="sections">
            <Flex
              className="sectionContent"
              flexDir={"column"}
              w={278}
              borderColor={"red.200"}
              borderWidth={2}
              p={1}
              mr={4}
            >
              <Flex
                className="sectionHeader"
                flexGrow={1}
                alignItems={"center"}
              >
                <Text
                  className={"sectionTitle"}
                  fontWeight={"bold"}
                  fontSize={"sm"}
                >
                  Section
                </Text>
                <Text
                  className="sectionTaskCount"
                  pl={2}
                  color={"gray.400"}
                  fontSize={"sm"}
                >
                  3
                </Text>
                <Spacer />
                <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
              </Flex>
              <Flex className="sectionBody">
                <TaskModalButton />
              </Flex>
            </Flex>
            <Flex alignItems={"center"}>
              <Text>Section</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default project;
