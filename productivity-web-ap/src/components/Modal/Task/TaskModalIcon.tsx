import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Stack,
  useDisclosure,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Select,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCategory from "./TaskCategory";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { auth, db } from "@/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";
import { arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const TaskModalIcon: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("red.500");
  // const [label, setLabel] = useState("read");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [category, setCategory] = useState("Inbox");
  const [userProjects, setUserProjects] = useState();
  const [projectsArray, setProjectsArray] = useState({})
  const [project, setProject] = useState();
  const [idProject, setIdProject] = useState();
  const [sectionId, setSectionId] = useState();
  const [section, setSection] = useState();
  const router = useRouter()

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
      // console.log("inbox id: ", idProject)
      getSection();
    }

  }, [idProject]);

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
      // console.log("projectId: ", userProjects[projectId])
      const projectRef = doc(db, "projects", userProjects[projectId]);
      const projectSnap = await getDoc(projectRef)
        // console.log("Received Project: ", projectSnap.data());
      // console.log(1)
      if (projectSnap.exists() && projectSnap.data().projectName==="inbox") {
        // console.log(2)
          setProjectsArray((current) => ({
            ...current,
            [projectSnap.id]: projectSnap.data(),
          }))
          setIdProject(projectSnap.id)
      }
    });
  };

  const getSection = async () => {
    // console.log("projectsArray[idProject].sections[0]: ", projectsArray[idProject].sections[0])
    const secRef = doc(db, "sections", projectsArray[idProject].sections[0]);
    const secSnap = await getDoc(secRef);
    if (secSnap.exists()) {
      // console.log("section data:", secSnap.data());
      // console.log(3)
      
      setSection(secSnap.data());
      setSectionId(secSnap.id);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such section!");
    }
  };


  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };
  const handleChangePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
    console.log(priority);
  };
  // const handleChangecategtory = (e: any) => {
  //   setCategory(e.target.value);
  // };

  // const handleClose = () => {
  //   setModalState((prev) => ({
  //     ...prev,
  //     open: false,
  //   }));
  // };

  const handleCreateTask = async () => {
    if (error) setError("");
    setLoading(true);
    try {
      // Create the task document in firestore
      // const taskDocRef= .collection("tasks").doc();

      const data = {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        taskName: taskName,
        desc: desc,
        dueDate: dueDate,
        priority: priority,
        // label: label,
        isAssigned: false,
        assignedTo: null,
        isInProject: false,
        fromProject: null,
      };
      const taskDocRef = doc(collection(db, "tasks"));
      await setDoc(taskDocRef, data);
      const taskId = taskDocRef.id;
      if (sectionId) {
        const secRef = doc(db, "sections", sectionId);
        await updateDoc(secRef, {
          tasks: arrayUnion(taskId),
        });
      }
      router.reload();
      onClose();
    } catch (error: any) {
      console.log("handleCreateTask error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Flex
        height={8}
        width={8}
        alignItems={"center"}
        justifyContent={"center"}
        color="white"
        borderRadius={"sm"}
        _hover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <AddIcon cursor="pointer" onClick={onOpen} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Create a New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={taskName}
                size="xs"
                variant="flushed"
                onChange={handleChangeTask}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={desc}
                size="xs"
                variant="flushed"
                onChange={handleChangeDesc}
              />
            </FormControl>
            <Stack direction="row" spacing={4} align="center" paddingTop="4">
              <Button size="xs">
                <Menu isLazy>
                  <MenuButton
                    fontSize="xs"
                    fontWeight="semibold"
                    cursor={"pointer"}
                  >
                    <Flex flexDir={"row"}>{dueDate.toLocaleString()}</Flex>
                  </MenuButton>

                  <MenuList>
                    <DateTimePicker value={dueDate} onChange={setDueDate} />
                  </MenuList>
                </Menu>
              </Button>

              <Button size="xs">
                <Select
                  placeholder="priority"
                  value={priority}
                  onChange={handleChangePriority}
                  size="xs"
                  variant="unstyled"
                >
                  <option value="red.500">1</option>
                  <option value="green.500">2</option>
                  <option value="yellow.500">3</option>
                  <option value="gray.500">4</option>
                </Select>
              </Button>
            </Stack>
            <Text fontSize={"9pt"} color="red" pt={1}>
              {error}
            </Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button size="xs">
              <Select
                value={category}
                onChange={handleChangecategtory}
                size="xs"
                variant="unstyled"
              >
                <option value="Inbox">Inbox</option>
                <option value="Education">Education</option>
                <option value="Home">Home</option>
              </Select>
            </Button> */}
            <Spacer />
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleCreateTask}
                isLoading={loading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TaskModalIcon;
