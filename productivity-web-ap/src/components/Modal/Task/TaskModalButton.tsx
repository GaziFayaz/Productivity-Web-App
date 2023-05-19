import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCategory from "./TaskCategory";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { auth, db } from "@/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";
import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Transaction,
  updateDoc,
} from "firebase/firestore";
import {useRouter} from "next/router";

const TaskModalButton: React.FC = (props: any) => {
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
  const router = useRouter()

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
      // const taskDocRef= firestore.collection("tasks").doc();

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
      if (props.sectionId) {
        const secRef = doc(db, "sections", props.sectionId);
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
      <Button
        p={0}
        m={0}
        onClick={onOpen}
        role="group"
        backgroundColor={"white"}
        _hover={{ backgroundColor: "white" }}
      >
        <Flex className="addTaskButton" alignItems={"center"} gap={1}>
          <AddIcon
            className="addIcon"
            borderRadius={"full"}
            fontSize={"16"}
            p={0.5}
            color={"brand.100"}
            _groupHover={{ color: "white", backgroundColor: "brand.100" }}
          />

          <Text
            fontSize={"sm"}
            color={"gray.500"}
            _groupHover={{ color: "brand.100" }}
          >
            Add Task
          </Text>
        </Flex>
      </Button>

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
export default TaskModalButton;
