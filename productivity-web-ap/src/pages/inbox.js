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
import React, { useState, useEffect } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosRadioButtonOff } from "react-icons/io";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import * as firestore from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";

export default function Inbox() {
  // const [taskComplete, setTaskComplete] = useState(false);

  // console.log(tasksArray);
  const [tasksArray, setTasksArray] = useState([]);
  const dbInstance = collection(db, "tasks");
  const toast = useToast();
  const taskFlag = [];

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    getDocs(dbInstance).then((data) => {
      setTasksArray(
        data.docs.map((item) => {
          return { ...item.data() };
        })
      );
    });
    // console.log(tasksArray[1].dueDate);
  };

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

            <Flex className="priority1" flexDir={"column"} mb="10" gap={3}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 1
              </Text>

              {tasksArray.map((task) => {
                const timestamp1 = new firestore.Timestamp(
                  task.dueDate.seconds,
                  task.dueDate.nanoseconds
                );

                const timestamp2 = new firestore.Timestamp(
                  task.createdAt.seconds,
                  task.createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={task.id}
                    hidden={task.priority != "red.500" ? true : false}
                  >
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

                        <Flex
                          flexDir={"column"}
                          key={task.creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{task.taskName}</Text>
                          <Text>{task.desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {timestamp1.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {timestamp2.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <Icon
                        as={AiOutlineEdit}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                      <Icon
                        as={AiOutlineDelete}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 2 */}
            <Flex
              className="priority2"
              flexDir={"column"}
              mb="10"
              gap={3}
              // hidden={task.priority != "green.500" ? true : false}
            >
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 2
              </Text>
              {/* Task section */}
              {tasksArray.map((task) => {
                const timestamp1 = new firestore.Timestamp(
                  task.dueDate.seconds,
                  task.dueDate.nanoseconds
                );

                const timestamp2 = new firestore.Timestamp(
                  task.createdAt.seconds,
                  task.createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={task.id}
                    hidden={task.priority != "green.500" ? true : false}
                  >
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

                        <Flex
                          flexDir={"column"}
                          key={task.creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{task.taskName}</Text>
                          <Text>{task.desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {timestamp1.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {timestamp2.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <Icon
                        as={AiOutlineEdit}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                      <Icon
                        as={AiOutlineDelete}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 3 */}
            <Flex className="priority3" flexDir={"column"} mb="10" gap={3}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 3
              </Text>

              {tasksArray.map((task) => {
                const timestamp1 = new firestore.Timestamp(
                  task.dueDate.seconds,
                  task.dueDate.nanoseconds
                );

                const timestamp2 = new firestore.Timestamp(
                  task.createdAt.seconds,
                  task.createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={task.id}
                    hidden={task.priority != "yellow.500" ? true : false}
                  >
                    <Flex flexDir={"row"} gap="2" flexGrow={1}>
                      <Flex>
                        <Icon
                          as={IoIosRadioButtonOff}
                          fontSize="22"
                          color={"yellow.500"}
                          paddingTop="1"
                          cursor="pointer"
                          onClick={completeTask}
                        />
                      </Flex>

                      <Flex flexDir={"column"}>
                        {/* task1 */}

                        <Flex
                          flexDir={"column"}
                          key={task.creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{task.taskName}</Text>
                          <Text>{task.desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {timestamp1.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {timestamp2.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <Icon
                        as={AiOutlineEdit}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                      <Icon
                        as={AiOutlineDelete}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 4 */}
            <Flex className="priority4" flexDir={"column"} mb="10" gap={3}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 4
              </Text>

              {tasksArray.map((task) => {
                const timestamp1 = new firestore.Timestamp(
                  task.dueDate.seconds,
                  task.dueDate.nanoseconds
                );

                const timestamp2 = new firestore.Timestamp(
                  task.createdAt.seconds,
                  task.createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={task.id}
                    hidden={task.priority != "gray.500" ? true : false}
                  >
                    <Flex flexDir={"row"} gap="2" flexGrow={1}>
                      <Flex>
                        <Icon
                          as={IoIosRadioButtonOff}
                          fontSize="22"
                          color={"gray.500"}
                          paddingTop="1"
                          cursor="pointer"
                          onClick={completeTask}
                        />
                      </Flex>

                      <Flex flexDir={"column"}>
                        {/* task1 */}

                        <Flex
                          flexDir={"column"}
                          key={task.creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{task.taskName}</Text>
                          <Text>{task.desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {timestamp1.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {timestamp2.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <Icon
                        as={AiOutlineEdit}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                      <Icon
                        as={AiOutlineDelete}
                        fontSize="18"
                        color={"gray.500"}
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

// export async function getServerSideProps() {
//   const tasksArray = [];
//   const dbInstance = collection(firestore, "tasks");
//   getDocs(dbInstance).then((data) => {
//     data.docs.map((item) => {
//       tasksArray.push("asdas");
//       return { ...item.data() };
//     });
//   });
//   console.log(tasksArray);
//   return {
//     props: { tasksArray },
//   };
// }
