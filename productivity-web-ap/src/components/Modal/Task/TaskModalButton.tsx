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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCategory from "./TaskCategory";

import { auth, firestore } from "@/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const TaskModalButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [taskName, setTaskName] = useState("Dummy");
  const [desc, setDesc] = useState("This is a dummy description");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("1");
  const [label, setLabel] = useState("read");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

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
      // const taskDocRef= firestore.collection("tasks").doc();

      const data = {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        taskName: taskName,
        desc: desc,
        dueDate: dueDate,
        priority: priority,
        label: label,
        isAssigned: false,
        assignedTo: null,
        isInProject: false,
        fromProject: null,
      };
      const taskDocRef = doc(collection(firestore, "tasks"));
      await setDoc(taskDocRef, data);
      onClose();
    } catch (error: any) {
      console.log("handleCreateTask error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        p={0}
        m={0}
        onClick={onOpen}
        role="group"
        backgroundColor={"white"}
        _hover={{backgroundColor:"white"}}
      >
        <Flex
          className="addTaskButton"
          alignItems={"center"}
          gap={1}
          
        >
          <AddIcon
            className="addIcon"
            borderRadius={"full"}
            fontSize={"16"}
            p={0.5}
            color={"brand.100"}
            _groupHover={{color: "white", backgroundColor:"brand.100"}}
          />

          <Text fontSize={"sm"} color={"gray.500"} _groupHover={{color:"brand.100"}}>
            Add Task
          </Text>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Create your account</ModalHeader> */}
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
              <Button size="xs">Due Date</Button>
              <Button size="xs">Priority</Button>
              <Button size="xs">Reminders</Button>
              <Button size="xs">Label</Button>
            </Stack>
            <Text fontSize={"9pt"} color="red" pt={1}>
              {error}
            </Text>
          </ModalBody>

          <ModalFooter>
            <TaskCategory />
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
export default TaskModalButton;
