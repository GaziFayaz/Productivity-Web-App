import {
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  Icon,
  HStack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { IoIosRadioButtonOff } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import TaskModalButton from "@/components/Modal/Task/TaskModalButton";
import SectionModalIcon from "@/components/Modal/Section/SectionModalIcon";
import { BsMessenger } from "react-icons/bs";
import { useRouter } from "next/router";
import { FiPlusSquare } from "react-icons/fi";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import EditProjectModalIcon from "../components/Modal/Project/EditProjectModalIcon";
import EditSectionModalIcon from "../components/Modal/Section/EditSectionModalIcon";
import EditTaskModalIcon from "../components/Modal/Task/EditTaskModalIcon";
import DeleteTaskButton from "@/components/Modal/Task/DeleteTaskButton";
import DeleteSectionButton from "@/components/Modal/Section/DeleteSectionButton";
import DeleteProjectButton from "@/components/Modal/Project/DeleteProjectButton";
import ShareProjectButton from "../components/Modal/Project/ShareProjectButton";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

export default function Today() {
  const router = useRouter();
  var today = new Date();
  // console.log("isoString" + today.toISOString().substr(0, 10));
  // console.log("endDAte: " + endDate);
  const toast = useToast();
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
    <Flex w="80vw" flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex className="todayContent" flexDir={"column"} w="55vw">
        <Flex className="todayHeader" alignItems={"center"} flexDir="row">
          <Heading className="todayName" size={"lg"}>
            Today
          </Heading>
          {/* todays date */}
          <Text as="sub" paddingLeft="1" paddingTop="2">
            {today.toISOString().substr(0, 10)}
          </Text>
          <Spacer />
        </Flex>
        <Flex className="todayBody" pr={10} pt={10} flexDir="column">
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
          })}<Heading as="md" size="md" pt={12}>
            Today
          </Heading>
          {/* task Section */}

          {Object.keys(taskArray).map((taskId, index) => {
            if (
              taskArray[taskId].dueDate.toDate().getDate() === today.getDate()
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
      </Flex>
    </Flex>
  );
}
