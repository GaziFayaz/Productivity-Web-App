import { auth, db } from "@/firebase/clientApp";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
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
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCircle } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";

const EditProjectModalIcon: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("Red");
  const [colorValue, setColorValue] = useState("#E53E3E");
  const projectId = router.query.project

  useEffect(() => {
    getProject()
  },[])

  const getProject= async() => {
    // gets the project from db and stores the object in state
    
    const projectRef = doc(db, "projects", projectId);
    // console.log("Project Reference : ",projectRef)
    // console.log("trail : ", projectRef.id)
    const projectSnap = await getDoc(projectRef);
    setProjectName(projectSnap.data()?.projectName);
    setColor(projectSnap.data()?.color)
    setColorValue(projectSnap.data()?.colorValue)
    // console.log("Document data:", project);
    // console.log("Document Id:", projectSnap.id);
  }

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

  const handleUpdateProject = async () => {
    // ** implement error handling later **
    if (error) setError("");
    if (user) {
      setLoading(true);

      try {
        // update the Project document in firestore
        const projectDocRef = doc(db, "projects", projectId);
        await updateDoc(projectDocRef, {
            projectName: projectName,
            color: color,
            colorValue: colorValue
        });
        router.reload()
        onClose();
      } catch (error: any) {
        console.log("handleCreateProject error", error);
        setError(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Text
        color={"gray.500"}
        cursor="pointer"
        _hover={{ color: "gray.800" }}
        onClick={onOpen}
        width={"full"}
      >
        Edit
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader textAlign={"center"}>Edit Project</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Edit Project
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
                onClick={handleUpdateProject}
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
export default EditProjectModalIcon;
