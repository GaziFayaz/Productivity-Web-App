import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCategory from "./TaskCategory";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { auth, db } from "@/firebase/clientApp";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const TaskModalButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [taskName, setTaskName] = useState("Dummy");
  const [category, setCategory] = useState("Inbox");

  const [desc, setDesc] = useState("This is a dummy description");
  // const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [label, setLabel] = useState("read");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateTimeValue, setdateTimeValue] = useState(new Date());

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
        dueDate: Timestamp.fromDate(dateTimeValue),
        priority: priority,
        category: category,
        // label: label,
        isAssigned: false,
        assignedTo: null,
        isInProject: false,
        fromProject: null,
      };
      const taskDocRef = doc(collection(db, "tasks"));
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
              <Button size="xs">
                <Menu isLazy>
                  <MenuButton
                    fontSize="xs"
                    fontWeight="semibold"
                    cursor={"pointer"}
                  >
                    <Flex flexDir={"row"}>
                      {dateTimeValue.toLocaleString()}
                    </Flex>
                  </MenuButton>

                  <MenuList>
                    <DateTimePicker
                      value={dateTimeValue}
                      onChange={setdateTimeValue}
                    />
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
              <Button size="xs">Reminders</Button>
              <Button size="xs">Label</Button>
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
