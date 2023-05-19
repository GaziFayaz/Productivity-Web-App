import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
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
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  Transaction,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";

const EditTaskModalIcon: React.FC = (task) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Inbox");

  useEffect(() => {
    const dueDateStamp = new Timestamp(
      task.task.dueDate.seconds,
      task.task.dueDate.nanoseconds
    );
    // console.log("TASK: ", dueDateStamp.toDate().toLocaleString());
    setTaskName(task.task.taskName);
    setDesc(task.task.desc);
    setDueDate(dueDateStamp.toDate());
    setPriority(task.task.priority);
    setCategory(task.task.category);
  }, []);

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
  const handleChangecategtory = (e: any) => {
    setCategory(e.target.value);
  };

  // const handleClose = () => {
  //   setModalState((prev) => ({
  //     ...prev,
  //     open: false,
  //   }));
  // };

  const handleUpdateTask = async () => {
    if (error) setError("");
    setLoading(true);
    try {
      // Create the task document in firestore

      const taskDocRef = doc(db, "tasks", task.taskId);
      await updateDoc(taskDocRef, {
        taskName: taskName,
        desc: desc,
        dueDate: dueDate,
        priority: priority,
        category: category,
      }).then(() => {
        router.reload();
      });
      onClose();
    } catch (error: any) {
      console.log("handleCreateTask error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Icon
        as={AiOutlineEdit}
        fontSize="18"
        color={"gray.500"}
        cursor="pointer"
        onClick={onOpen}
        role="group"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Edit Task</ModalHeader>
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
            <Button size="xs">
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
            </Button>
            <Spacer />
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleUpdateTask}
                isLoading={loading}
              >
                Confirm
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditTaskModalIcon;
