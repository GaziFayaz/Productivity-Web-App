import {
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  Icon,
  HStack,
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
import EditProjectModalIcon from "../../components/Modal/Project/EditProjectModalIcon";
import EditSectionModalIcon from "../../components/Modal/Section/EditSectionModalIcon";
import EditTaskModalIcon from "../../components/Modal/Task/EditTaskModalIcon";
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

const Project = () => {
  const router = useRouter();
  const projectId = router.query.project;
  const [project, setProject] = useState("");
  const [sectionArray, setSectionArray] = useState({});
  const [taskArray, setTaskArray] = useState({});
  const [sectionAdd, setSectionAdd] = useState(false);
  const [user] = useAuthState(auth);
  const handleChat = () => {
    // console.log(user?.uid, user?.displayName);
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: user?.displayName || user.email?.split("@")[0],
          secret: user?.uid,
        },
        {
          headers: { "Private-key": "69f788b1-1b0c-4abf-9581-bb27d06d0b90" },
        }
      )
      .then((r) => router.push("/Chats/chats"));
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  useEffect(() => {
    // useEffect to get the sections of the project only when project state is assigned
    if (!project) {
      return;
    }
    getSection();
  }, [project]);

  useEffect(() => {
    // useEffect to get the tasks of the sections on when section array is updated
    if (!sectionArray) return;
    getTask();
  }, [sectionArray]);

  const getProject = async () => {
    // gets the project from db and stores the object in state

    const projectRef = doc(db, "projects", projectId);
    // console.log("Project Reference : ",projectRef)
    // console.log("trail : ", projectRef.id)
    const projectSnap = await getDoc(projectRef);
    setProject(projectSnap.data());
    // console.log("Document data:", project);
    // console.log("Document Id:", projectSnap.id);
  };

  const getSection = async () => {
    // gets all the sections from project and stores them in an array like a dictionary where key = sectionId and value is the sectionObject
    project.sections.map(async (section) => {
      const secRef = doc(db, "sections", section);
      const secSnap = await getDoc(secRef);
      if (secSnap.exists()) {
        // console.log("section data:", secSnap.data());
        setSectionArray((current) => ({
          ...current,
          [secSnap.id]: secSnap.data(),
        }));
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such section!");
      }
    });
  };

  const getTask = async () => {
    console.log(sectionArray);
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
          console.log("No such task!");
        }
      }
    }
  };

  const handleOpenAddSection = () => {
    setSectionAdd(true);
  };

  const completeTask = () => {
    toast({
      // title: "Account created.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 7000,
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
    <Flex flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex className="projectContent" flexDir={"column"} w="55vw">
        <Flex className="ProjectHeader" alignItems={"center"}>
          <Text className="ProjectName" fontSize={"2xl"} fontWeight={"bold"}>
            {project.projectName}
          </Text>
          <Spacer />
          <HStack spacing="20px">
            <Flex alignItems={"center"}>
              <Icon as={AiOutlineUserAdd} fontSize="22" color={"gray.500"} />
              <Text pl={0.5} fontSize={12} color={"gray.500"}>
                Share
              </Text>
            </Flex>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={
                  <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
                }
              />
              <MenuList>
                <MenuItem>
                  <EditProjectModalIcon />
                </MenuItem>
                <MenuItem>Share</MenuItem>
                <MenuItem textColor={"red"}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Flex className="projectBody" mr={10} mt={10}>
          <Flex className="sections" flexDir={"column"} gap={4}>
            {Object.keys(sectionArray).map((sectionId, index) => {
              return (
                <Flex
                  className="sectionContent"
                  key={index}
                  flexDir={"column"}
                  // w={278}
                  flexGrow
                  p={1}
                >
                  <Flex
                    className="sectionHeader"
                    flexGrow={1}
                    alignItems={"center"}
                  >
                    <Text
                      className={"sectionTitle"}
                      fontWeight={"bold"}
                      fontSize={"lg"}
                    >
                      {sectionArray[sectionId].sectionName}
                    </Text>
                    <Text
                      className="sectionTaskCount"
                      pl={2}
                      color={"gray.400"}
                      fontSize={"sm"}
                    >
                      {sectionArray[sectionId].tasks.length}
                    </Text>
                    <Spacer />
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={
                          <Icon
                            as={SlOptions}
                            fontSize="18"
                            color={"gray.500"}
                          />
                        }
                      ></MenuButton>
                      <MenuList>
                        <MenuItem>
                          <EditSectionModalIcon
                            sectionId={sectionId}
                            section={sectionArray[sectionId]}
                          />
                        </MenuItem>
                        <MenuItem textColor={"red"}>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Flex className="sectionBody" flexDir={"column"} gap={4}>
                    {sectionArray[sectionId].tasks.map((task) => {
                      return (
                        <>
                          {Object.keys(taskArray).map((taskId, index) => {
                            if (taskId === task) {
                              const dueDateStamp = new Timestamp(
                                taskArray[taskId].dueDate.seconds,
                                taskArray[taskId].dueDate.nanoseconds
                              );

                              const createdStamp = new Timestamp(
                                taskArray[taskId].createdAt.seconds,
                                taskArray[taskId].createdAt.nanoseconds
                              );

                              return (
                                <Flex flexDir={"row"} key={index}>
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

                                    <Flex flexDir={"column"}>
                                      {/* task1 */}

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
                                          {dueDateStamp
                                            .toDate()
                                            .toLocaleString()}
                                        </Text>
                                        <Text fontSize="xs">
                                          {" "}
                                          Created:
                                          {createdStamp
                                            .toDate()
                                            .toLocaleString()}
                                        </Text>
                                      </Flex>
                                    </Flex>
                                  </Flex>

                                  {/* edit,delete section */}
                                  <Flex ml={20} gap="2">
                                    <EditTaskModalIcon
                                      taskId={taskId}
                                      task={taskArray[taskId]}
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
                            }
                          })}
                        </>
                      );
                    })}
                    <TaskModalButton sectionId={sectionId} />
                  </Flex>
                </Flex>
              );
            })}

            {sectionAdd ? <div></div> : <SectionModalIcon />}
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Icon
          as={BsMessenger}
          alt="Chat with project teammates"
          cursor={"pointer"}
          position="fixed"
          bottom={4}
          right={0}
          boxSize={10}
          onClick={handleChat}
        />
      </Flex>
    </Flex>
  );
};

export default Project;
