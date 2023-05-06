import { auth, db } from "@/firebase/clientApp";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCircle } from "react-icons/fi";

const ProjectModalIcon: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("Red");
  const [colorValue, setColorValue] = useState("#E53E3E");

  const handleChangeProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  
  const handleChangeColor = (event: any) => {
    if (event.target.value) {
      console.log(event.target.value);
      const colorArray = event.target.value.split(",");

      setColor(colorArray[0]);
      setColorValue(colorArray[1]);
    }
  };

  const handleCreateProject = async () => {
    // ** implement error handling later **
    if (error) setError("");
    setLoading(true);

    try {
      // Create the Project document in firestore

      const data = {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        projectName: projectName,
        color: color,
        colorValue: colorValue,
        numberOfMembers: 1,
        members: [user?.uid],
        numberOfSections: 0,
        sections: [],
      };
      const projectDocRef = doc(collection(db, "projects"));
      await setDoc(projectDocRef, data);
      onClose();
    } catch (error: any) {
      console.log("handleCreateProject error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <AddIcon
        color={"gray.500"}
        cursor="pointer"
        _hover={{ color: "gray.800" }}
        onClick={onOpen}
      />
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
                  <MenuItem
                    value={["Red", "#E53E3E"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#E53E3E" color={"#E53E3E"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Red
                    </Text>
                  </MenuItem>
                  <MenuItem
                    value={["Blue", "#4299E1"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#4299E1" color={"#4299E1"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Blue
                    </Text>
                  </MenuItem>
                  <MenuItem
                    value={["Green", "#48BB78"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#48BB78" color={"#48BB78"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Green
                    </Text>
                  </MenuItem>
                  <MenuItem
                    value={["Yellow", "#F6E05E"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#F6E05E" color={"#F6E05E"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Yellow
                    </Text>
                  </MenuItem>
                  <MenuItem
                    value={["Purple", "#805AD5"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#805AD5" color={"#805AD5"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Purple
                    </Text>
                  </MenuItem>
                  <MenuItem
                    value={["Orange", "#ED8936"]}
                    onClick={handleChangeColor}
                  >
                    <FiCircle fill="#ED8936" color={"#ED8936"} />
                    <Text ml={2} fontWeight={"bold"}>
                      Orange
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Spacer />
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleCreateProject}
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
export default ProjectModalIcon;
