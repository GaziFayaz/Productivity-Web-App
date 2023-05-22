import {
  Button,
  Flex,
  Spacer,
  Text,
  Icon,
  useToast,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosRadioButtonOff } from "react-icons/io";

// import DateTimePicker from "react-datetime-picker";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import TaskModalButton from "@/components/Modal/Task/TaskModalButton";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import ScrollToTop from "../components/SideComponents/ScrollToTop";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";

export default function Upcoming() {
  const router = useRouter();
  var today = new Date();
  // console.log("isoString" + today.toISOString().substr(0, 10));
  var endDate = new Date(
    `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
  );
  const dates = [];
  for (let date = today; date <= endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  // console.log("endDAte: " + endDate);
  const toast = useToast();
  const [value, onChange] = useState(new Date());
  const [userProjects, setUserProjects] = useState([]);
  const [projectsArray, setProjectsArray] = useState({});
  const [sectionArray, setSectionArray] = useState({});
  const [taskArray, setTaskArray] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) getUserProjects();
  }, [user]);

  useEffect(() => {
    if (userProjects) getProjects();
    // console.log("copying porject", projectsArray);
  }, [userProjects]);

  useEffect(() => {
    if (projectsArray) getSection();
  }, [projectsArray]);

  useEffect(() => {
    if (sectionArray) getTask();
  }, [sectionArray]);

  const getUserProjects = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        // console.log(userSnap.data().projects);
        setUserProjects(userSnap.data().projects);
      }
    }
  };

  const getProjects = () => {
    Object.keys(userProjects).map(async (projectId, index) => {
      // console.log("ProjectID: ", userProjects[projectId])
      // console.log("index: ", index)
      const projectRef = doc(db, "projects", userProjects[projectId]);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        setProjectsArray((current) => ({
          ...current,
          [projectSnap.id]: projectSnap.data(),
        }));
      }
    });
  };

  const getSection = async () => {
    // gets all the sections from project and stores them in an array like a dictionary where key = sectionId and value is the sectionObject
    Object.keys(projectsArray).map(async (projectId, index) => {
      projectsArray[projectId].sections.map(async (section) => {
        const secRef = doc(db, "sections", section);
        const secSnap = await getDoc(secRef);
        if (secSnap.exists()) {
          // console.log("section data:", secSnap.data());
          setSectionArray((current) => ({
            ...current,
            [secSnap.id]: secSnap.data(),
          }));
        }
      });
    });
  };

  const getTask = async () => {
    // console.log(sectionArray);
    for (var section in sectionArray) {
      // console.log(section + " : " + sectionArray[section].tasks);
      for (var task in sectionArray[section].tasks) {
        // console.log("returned tasks:",sectionArray[section].tasks[task])
        const taskRef = doc(db, "tasks", sectionArray[section].tasks[task]);
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
          // console.log("task data:", taskSnap.data());
          setTaskArray((current) => ({
            ...current,
            [taskSnap.id]: taskSnap.data(),
          }));
        } else {
          console.log("No such task! ", taskSnap.id);
        }
      }
    }
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
    <Flex w="80vw" flexDir={"column"} h="100%" pt={10} pl={20} pr={20} pb={10}>
      <Flex className="upcomingContent" flexDir={"column"} w="55vw">
        <Flex className="upcomingHeader" alignItems={"center"} flexDir="row">
          <Menu isLazy>
            <MenuButton as={Heading} size="lg" cursor={"pointer"}>
              <Flex flexDir={"row"}>
                {value.toLocaleString("default", { month: "long" }) +
                  " " +
                  value.getDate() +
                  " " +
                  value.getFullYear()}
                <ChevronDownIcon
                  cursor={"pointer"}
                  marginLeft="1"
                  marginTop="2"
                  w={5}
                  h={5}
                />
              </Flex>
            </MenuButton>

            <MenuList>
              <DateTimePicker value={value} onChange={onChange} />
            </MenuList>
          </Menu>
          <Link
            _hover={{ textDecor: "none" }}
            href={`#${value.toDateString()}`}
          >
            <Button colorScheme="red" variant="ghost">
              Search Selected Date
            </Button>
          </Link>
        </Flex>
        {/* Overdue Section */}
        <Flex className="overdue" pr={10} pt={10} flexDir="column">
          <Heading as="md" size="md">
            Overdue
          </Heading>
          {/* task Section */}

          {Object.keys(taskArray).map((taskId, index) => {
            if (
              taskArray[taskId].dueDate.toDate().getDate() < today.getDate()
            ) {
              const dueDateStamp = new Timestamp(
                taskArray[taskId].dueDate.seconds,
                taskArray[taskId].dueDate.nanoseconds
              );

              const createdStamp = new Timestamp(
                taskArray[taskId].createdAt.seconds,
                taskArray[taskId].createdAt.nanoseconds
              );
              return (
                <Flex className="taskSection" flexDir={"row"} paddingTop="4">
                  <Flex flexDir={"row"} gap="2" flexGrow={1}>
                    <Flex>
                      <Icon
                        as={IoIosRadioButtonOff}
                        fontSize="22"
                        color={taskArray[taskId].priority}
                        paddingTop="1"
                        cursor="pointer"
                        onClick={completeTask}
                      />
                    </Flex>

                    <Flex
                      flexDir={"column"}
                      key={taskId}
                      // hidden={task.priority != "red.500" ? true : false}
                    >
                      <Text fontWeight={"bold"}>
                        {taskArray[taskId].taskName}
                      </Text>
                      <Text fontWeight={"semibold"}>
                        {taskArray[taskId].desc}
                      </Text>
                      <Text fontSize="xs">
                        {" "}
                        Due date:
                        {dueDateStamp.toDate().toLocaleString()}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* edit,delete section
                  <Flex ml={20}>
                    <Icon as={AiOutlineEdit} fontSize="18" color={"gray.500"} />
                  </Flex> */}
                </Flex>
              );
            }
          })}
        </Flex>
        <Flex
          className="upcomingTasks"
          flexDir={"column"}
          marginTop={2}
          gap={10}
        >
          {dates.map((date, index) => (
            <Flex key={index} flexDir="column">
              <Heading
                key={index}
                size="sm"
                color={"grey"}
                id={date.toDateString()}
              >
                {date.toDateString()}
              </Heading>
                {Object.keys(taskArray).map((taskId, index) => {
                  if (
                    taskArray[taskId].dueDate.toDate().getDate() ===
                    date.getDate()
                  ) {
                    const dueDateStamp = new Timestamp(
                      taskArray[taskId].dueDate.seconds,
                      taskArray[taskId].dueDate.nanoseconds
                    );

                    const createdStamp = new Timestamp(
                      taskArray[taskId].createdAt.seconds,
                      taskArray[taskId].createdAt.nanoseconds
                    );
                    return (
                      <Flex
                        className="taskSection"
                        flexDir={"row"}
                        paddingTop="4"
                      >
                        <Flex flexDir={"row"} gap="2" flexGrow={1}>
                          <Flex>
                            <Icon
                              as={IoIosRadioButtonOff}
                              fontSize="22"
                              color={taskArray[taskId].priority}
                              paddingTop="1"
                              cursor="pointer"
                              onClick={completeTask}
                            />
                          </Flex>

                          <Flex
                            flexDir={"column"}
                            key={taskId}
                            // hidden={task.priority != "red.500" ? true : false}
                          >
                            <Text fontWeight={"bold"}>
                              {taskArray[taskId].taskName}
                            </Text>
                            <Text fontWeight={"semibold"}>
                              {taskArray[taskId].desc}
                            </Text>
                            <Text fontSize="xs">
                              {" "}
                              Due date:
                              {dueDateStamp.toDate().toLocaleString()}
                            </Text>
                            {/* <Text fontSize="xs">
                              {" "}
                              Created:
                              {createdStamp.toDate().toLocaleString()}
                            </Text> */}
                          </Flex>
                        </Flex>

                        {/* edit,delete section
                        <Flex ml={20}>
                          <Icon
                            as={AiOutlineEdit}
                            fontSize="18"
                            color={"gray.500"}
                          />
                        </Flex> */}
                      </Flex>
                    );
                  }
                })}
            </Flex>
          ))}
        </Flex>
        <ScrollToTop />
      </Flex>
    </Flex>
  );
}
