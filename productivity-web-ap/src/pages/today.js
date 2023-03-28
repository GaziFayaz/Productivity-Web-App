import {
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosRadioButtonOff } from "react-icons/io";

export default function Today() {
  const toast = useToast();
  const completeTask = () => {
    toast({
      // title: "Account created.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
      render: () => (
        <Flex
          borderRadius="lg"
          alignItems="center"
          flexDir="row"
          backgroundColor="brand.100"
        >
          <Text ml="2" color="gray.100">
            Task completed
          </Text>
          <Spacer />
          <Button
            textColor="gray.100"
            _hover={{ backgroundColor: "brand.100" }}
            p={3}
            bg="brand.100"
          >
            Undo
          </Button>
        </Flex>
      ),
    });
  };
  return (
    <Flex w="80vw" flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex className="todayContent" flexDir={"column"} w="55vw">
        <Flex className="todayHeader" alignItems={"center"} flexDir="row">
          <Heading className="todayName" size={"lg"}>
            Today
          </Heading>
          {/* todays date */}
          <Text as="sub" paddingLeft="1" paddingTop="2">
            Thu 23 March
          </Text>
          <Spacer />
        </Flex>
        <Flex className="todayBody" pr={10} pt={10} flexDir="column">
          <Heading as="md" size="md">
            Overdue
          </Heading>
          <Flex flexDir={"row"} paddingTop="4">
            <Flex flexDir={"row"} gap="2" flexGrow={1}>
              <Flex>
                <Icon
                  as={IoIosRadioButtonOff}
                  fontSize="22"
                  color={"red.500"}
                  paddingTop="1"
                  cursor="pointer"
                  onClick={completeTask}
                />
              </Flex>

              <Flex flexDir={"column"}>
                {/* task1 */}
                <Text>sdaaaaaaasada asdassadasdasdasdasdasdasda</Text>
                <Text fontSize="xs">20 march</Text>
              </Flex>
            </Flex>

            {/* edit,delete section */}
            <Flex ml={20}>
              <Icon as={AiOutlineEdit} fontSize="18" color={"gray.500"} />
            </Flex>
          </Flex>
          <Flex flexDir={"row"} paddingTop="4">
            <Flex flexDir={"row"} gap="2" flexGrow={1}>
              <Flex>
                <Icon
                  as={IoIosRadioButtonOff}
                  fontSize="22"
                  color={"red.500"}
                  paddingTop="1"
                  cursor="pointer"
                  onClick={completeTask}
                />
              </Flex>

              <Flex flexDir={"column"}>
                {/* task1 */}
                <Text>sdaaaaaaasada asdassadasdasdasdasdasdasda</Text>
                <Text fontSize="xs">20 march</Text>
              </Flex>
            </Flex>

            {/* edit,delete section */}
            <Flex ml={20}>
              <Icon as={AiOutlineEdit} fontSize="18" color={"gray.500"} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
