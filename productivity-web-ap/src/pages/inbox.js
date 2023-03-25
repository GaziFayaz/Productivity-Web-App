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


export default function Inbox() {
  const [taskComplete, setTaskComplete] = useState(false);
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
      <Flex className="inboxContent" flexDir={"column"} w="55vw">
        <Flex className="inboxHeader" alignItems={"center"}>
          <Heading className="inboxName" size={"lg"}>
            Inbox
          </Heading>
          <Spacer />
        </Flex>
        <Flex className="inboxBody" pr={10} pt={10}>
          <Flex className="prioritySections" flexDir={"column"}>
            {/* priority 1 */}
            <Flex className="priority1" flexDir={"column"} mb="10">
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 1
              </Text>

              <Flex flexDir={"row"} hidden={taskComplete ? "true" : ""}>
                {/* Task section */}
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

            {/* priority 2 */}
            <Flex className="priority2" flexDir={"column"} mb="10">
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 2
              </Text>

              <Flex flexDir={"row"} hidden={taskComplete ? "true" : ""}>
                {/* Task section */}
                <Flex flexDir={"row"} gap="2" flexGrow={1}>
                  <Icon
                    as={IoIosRadioButtonOff}
                    fontSize="22"
                    color={"green.500"}
                    paddingTop="1"
                  />
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

            {/* priority 3 */}
            <Flex className="priority3" flexDir={"column"} mb="10">
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 3
              </Text>

              <Flex flexDir={"row"} hidden={taskComplete ? "true" : ""}>
                {/* Task section */}
                <Flex flexDir={"row"} gap="2" flexGrow={1}>
                  <Icon
                    as={IoIosRadioButtonOff}
                    fontSize="22"
                    fontWeight={"bold"}
                    color={"yellow.400"}
                    paddingTop="1"
                  />
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

            {/* priority 4 */}
            <Flex className="priority4" flexDir={"column"} mb="10">
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 4
              </Text>

              <Flex flexDir={"row"} hidden={taskComplete ? "true" : ""}>
                {/* Task section */}
                <Flex flexDir={"row"} gap="2" flexGrow={1}>
                  <Icon
                    as={IoIosRadioButtonOff}
                    fontSize="22"
                    color={"gray.500"}
                    paddingTop="1"
                  />
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

              <Flex flexDir={"row"} hidden={taskComplete ? "true" : ""}>
                {/* Task section */}
                <Flex flexDir={"row"} gap="2" flexGrow={1}>
                  <Icon
                    as={IoIosRadioButtonOff}
                    fontSize="22"
                    color={"gray.500"}
                    paddingTop="1"
                  />
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
      </Flex>
    </Flex>
  );
}
