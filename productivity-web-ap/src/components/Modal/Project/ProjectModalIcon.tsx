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
  Icon,
  Select,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FiCircle } from "react-icons/fi";

const ProjectModalIcon: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("Red");
  const [colorValue, setColorValue] = useState("#E53E3E");
  const handleChangeProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleChangeColor = (event: any) => {
    if(color && colorValue){
      let colorArray = event.target.value.split(",")
    console.log(colorArray);
    setColor(colorArray[0]);
    setColorValue(colorArray[1])
    }
  };

  return (
    <>
      <AddIcon color={"gray.500"} cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Create your account</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Add Project
            </FormLabel>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={projectName}
                variant="outline"
                fontSize={"md"}
                size={"sm"}
                borderRadius={"lg"}
                focusBorderColor={"black"}
                onChange={handleChangeProject}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Color</FormLabel>
              <Menu matchWidth>
                <MenuButton
                  as={Button}
                  backgroundColor={"gray.200"}
                  width="100%"
                  textAlign={"left"}
                  rightIcon={<ChevronDownIcon />}
                >
                  <Flex alignItems={"center"} gap={1}>
                    <FiCircle fill={colorValue} color={colorValue} />
                    <Text>{color}</Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem value={["Red", "#E53E3E"]} onClick={handleChangeColor}>
                    <FiCircle fill="#E53E3E" color={"#E53E3E"}  />
                    <Text ml={2} fontWeight={"bold"}>Red</Text>
                  </MenuItem>
                  <MenuItem value={["Blue", "#4299E1"]} onClick={handleChangeColor}>
                    <FiCircle fill="#4299E1" color={"#4299E1"} />
                    <Text ml={2} fontWeight={"bold"}>Blue</Text>
                  </MenuItem>
                  <MenuItem value={["Green", "#48BB78"]} onClick={handleChangeColor}>
                    <FiCircle fill="#48BB78" color={"#48BB78"} />
                    <Text ml={2} fontWeight={"bold"}>Green</Text>
                  </MenuItem>
                  <MenuItem value={["Yellow", "#F6E05E"]} onClick={handleChangeColor}>
                    <FiCircle fill="#F6E05E" color={"#F6E05E"} />
                    <Text ml={2} fontWeight={"bold"}>Yellow</Text>
                  </MenuItem>
                  <MenuItem value={["Purple", "#805AD5"]} onClick={handleChangeColor}>
                    <FiCircle fill="#805AD5" color={"#805AD5"} />
                    <Text ml={2} fontWeight={"bold"}>Purple</Text>
                  </MenuItem>
                  <MenuItem value={["Orange", "#ED8936"]} onClick={handleChangeColor}>
                    <FiCircle fill="#ED8936" color={"#ED8936"} />
                    <Text ml={2} fontWeight={"bold"}>Orange</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </FormControl>
          </ModalBody>

          <ModalFooter>
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
export default ProjectModalIcon;
