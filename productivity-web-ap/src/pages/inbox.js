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
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";
import * as firestore from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import TaskModalButton from "@/components/Modal/Task/TaskModalButton";
import EditTaskModalIcon from "@/components/Modal/Task/EditTaskModalIcon";
import DeleteTaskButton from "@/components/Modal/Task/DeleteTaskButton";

export default function Inbox() {
  // const [taskComplete, setTaskComplete] = useState(false);

  const [user] = useAuthState(auth);
  const [userProjects, setUserProjects] = useState();
  const [projectsArray, setProjectsArray] = useState({});
  const [project, setProject] = useState();
  const [idProject, setIdProject] = useState();
  const [sectionId, setSectionId] = useState();
  const [section, setSection] = useState();
  const [tasksArray, setTasksArray] = useState({});
  const toast = useToast();
  const today = new Date();

  useEffect(() => {
    if (user) getUserProjects();
  }, [user]);

  useEffect(() => {
    if (userProjects) {
      // console.log("userProjects: ", userProjects);
      getProject();
    }
  }, [userProjects]);

  useEffect(() => {
    // useEffect to get the sections of the project only when project state is assigned
    if (idProject) {
      // console.log("inbox id: ", idProject);
      getSection();
    }
  }, [idProject]);

  useEffect(() => {
    // useEffect to get the tasks of the sections on when section array is updated
    if (sectionId) {
      // console.log("section: ", section);
      getTasks();
    }
  }, [sectionId]);

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

  const getProject = () => {
    Object.keys(userProjects).map(async (projectId, index) => {
      // console.log("projectId: ", userProjects[projectId]);
      const projectRef = doc(db, "projects", userProjects[projectId]);
      const projectSnap = await getDoc(projectRef);
      // console.log("Received Project: ", projectSnap.data());
      // console.log(1);
      if (projectSnap.exists() && projectSnap.data().projectName === "inbox") {
        // console.log(2);
        setProjectsArray((current) => ({
          ...current,
          [projectSnap.id]: projectSnap.data(),
        }));
        setIdProject(projectSnap.id);
      }
    });
  };

  const getSection = async () => {
    // console.log(
    //   "projectsArray[idProject].sections[0]: ",
    //   projectsArray[idProject].sections[0]
    // );
    const secRef = doc(db, "sections", projectsArray[idProject].sections[0]);
    const secSnap = await getDoc(secRef);
    if (secSnap.exists()) {
      // console.log("section data:", secSnap.data());
      // console.log(3);

      setSection(secSnap.data());
      setSectionId(secSnap.id);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such section!");
    }
  };

  const getTasks = async () => {
    for (var task in section.tasks) {
      // console.log("Task from section: ", section.tasks[task]);
      const taskRef = doc(db, "tasks", section.tasks[task]);
      const taskSnap = await getDoc(taskRef);
      if (taskSnap.exists()) {
        // console.log("task data:", taskSnap.data());
        setTasksArray((current) => ({
          ...current,
          [taskSnap.id]: taskSnap.data(),
        }));
      } else {
        console.log("No such task! taskId: ", taskSnap.id);
      }
    }
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

            <Flex className="priority1" flexDir={"column"} mb="5" gap={2}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 1
              </Text>

              {Object.keys(tasksArray).map((taskId, index) => {
                const dueDateStamp = new firestore.Timestamp(
                  tasksArray[taskId].dueDate.seconds,
                  tasksArray[taskId].dueDate.nanoseconds
                );

                const createdStamp = new firestore.Timestamp(
                  tasksArray[taskId].dueDate.seconds,
                  tasksArray[taskId].dueDate.nanoseconds
                );
                // console.log("date" + safeJsonStringify(dueDateStamp.toDate().getDate() - 1));
                return (
                  <Flex
                    flexDir={"row"}
                    key={taskId}
                    hidden={
                      tasksArray[taskId].priority != "red.500" ? true : false
                    }
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
                          key={tasksArray[taskId].creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{tasksArray[taskId].taskName}</Text>
                          <Text>{tasksArray[taskId].desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {dueDateStamp.toDate().toDateString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {createdStamp.toDate().toDateString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <EditTaskModalIcon
                        taskId={taskId}
                        task={tasksArray[taskId]}
                      />
                      <DeleteTaskButton taskId={taskId} sectionId={sectionId} />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 2 */}
            <Flex
              className="priority2"
              flexDir={"column"}
              mb="5"
              gap={2}
              // hidden={task.priority != "green.500" ? true : false}
            >
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 2
              </Text>
              {/* Task section */}
              {Object.keys(tasksArray).map((taskId, index) => {
                const dueDateStamp = new firestore.Timestamp(
                  tasksArray[taskId].dueDate.seconds,
                  tasksArray[taskId].dueDate.nanoseconds
                );

                const createdStamp = new firestore.Timestamp(
                  tasksArray[taskId].createdAt.seconds,
                  tasksArray[taskId].createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={taskId}
                    hidden={
                      tasksArray[taskId].priority != "green.500" ? true : false
                    }
                  >
                    <Flex flexDir={"row"} gap="2" flexGrow={1}>
                      <Flex>
                        <Icon
                          as={IoIosRadioButtonOff}
                          fontSize="22"
                          color={"green.500"}
                          paddingTop="1"
                          cursor="pointer"
                          onClick={completeTask}
                        />
                      </Flex>

                      <Flex flexDir={"column"}>
                        {/* task1 */}

                        <Flex
                          flexDir={"column"}
                          key={tasksArray[taskId].creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{tasksArray[taskId].taskName}</Text>
                          <Text>{tasksArray[taskId].desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {dueDateStamp.toDate().toDateString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {createdStamp.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <EditTaskModalIcon
                        taskId={taskId}
                        task={tasksArray[taskId]}
                      />
                      <DeleteTaskButton taskId={taskId} sectionId={sectionId} />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 3 */}
            <Flex className="priority3" flexDir={"column"} mb="5" gap={2}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 3
              </Text>

              {Object.keys(tasksArray).map((taskId, index) => {
                const dueDateStamp = new firestore.Timestamp(
                  tasksArray[taskId].dueDate.seconds,
                  tasksArray[taskId].dueDate.nanoseconds
                );

                const createdStamp = new firestore.Timestamp(
                  tasksArray[taskId].createdAt.seconds,
                  tasksArray[taskId].createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={taskId}
                    hidden={
                      tasksArray[taskId].priority != "yellow.500" ? true : false
                    }
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
                          key={tasksArray[taskId].creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{tasksArray[taskId].taskName}</Text>
                          <Text>{tasksArray[taskId].desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {dueDateStamp.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {createdStamp.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <EditTaskModalIcon
                        taskId={taskId}
                        task={tasksArray[taskId]}
                      />
                      <DeleteTaskButton taskId={taskId} sectionId={sectionId} />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>

            {/* priority 4 */}
            <Flex className="priority4" flexDir={"column"} mb="5" gap={2}>
              <Text mb="2" fontSize={"lg"} fontWeight={"bold"}>
                Priority 4
              </Text>

              {Object.keys(tasksArray).map((taskId, index) => {
                const dueDateStamp = new firestore.Timestamp(
                  tasksArray[taskId].dueDate.seconds,
                  tasksArray[taskId].dueDate.nanoseconds
                );

                const createdStamp = new firestore.Timestamp(
                  tasksArray[taskId].createdAt.seconds,
                  tasksArray[taskId].createdAt.nanoseconds
                );
                return (
                  <Flex
                    flexDir={"row"}
                    key={taskId}
                    hidden={
                      tasksArray[taskId].priority != "gray.500" ? true : false
                    }
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
                          key={tasksArray[taskId].creatorId}
                          // hidden={task.priority != "red.500" ? true : false}
                        >
                          <Text>{tasksArray[taskId].taskName}</Text>
                          <Text>{tasksArray[taskId].desc}</Text>
                          <Text fontSize="xs">
                            {" "}
                            Due date:
                            {dueDateStamp.toDate().toLocaleString()}
                          </Text>
                          <Text fontSize="xs">
                            {" "}
                            Created:
                            {createdStamp.toDate().toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* edit,delete section */}
                    <Flex ml={20} gap="2">
                      <EditTaskModalIcon
                        taskId={taskId}
                        task={tasksArray[taskId]}
                      />
                      <DeleteTaskButton taskId={taskId} sectionId={sectionId} />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
            <TaskModalButton sectionId={sectionId} />
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
