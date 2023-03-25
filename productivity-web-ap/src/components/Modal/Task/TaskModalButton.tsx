import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  useFocusEffect,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCategory from "./TaskCategory";

import { auth } from "@/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";

const TaskModalButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
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

  return (
    <>
      <Button
        p={0}
        m={0}
        fontSize={5}
        _hover={{
          backgroundColor: "gray.300",
        }}
        onClick={onOpen}
      >
        <Flex
          className="addTaskButton"
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <AddIcon
            className="addIcon"
            color={"brand.100"}
            fontSize={"16"}
            p={0.5}
          />

          <Text color={"brand.100"} fontSize={"sm"}>
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
                onChange={handleChangeDesc}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={desc}
                size="xs"
                variant="flushed"
                onChange={handleChangeTask}
              />
            </FormControl>
            <Stack direction="row" spacing={4} align="center" paddingTop="4">
              <Button size="xs">Due Date</Button>
              <Button size="xs">Priority</Button>
              <Button size="xs">Reminders</Button>
              <Button size="xs">Label</Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <TaskCategory />
            <Spacer />
            <Flex>
              <Button colorScheme="blue" mr={3}>
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
