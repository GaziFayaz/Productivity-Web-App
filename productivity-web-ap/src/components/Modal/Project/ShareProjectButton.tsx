import { auth, db } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Flex,
  Icon,
  Text,
  Button,
  color,
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
  useToast,
} from "@chakra-ui/react";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiCircle } from "react-icons/fi";

const ShareProjectButton = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const projectId = router.query.project;
  const [email, setEmail] = useState("");
  const [userDocId, setUserDocId] = useState(""); // id of user to be shared to
  const [userDocData, setUserDocData] = useState(); // document of user to be shared to

  useEffect(() => {
    if (email) setError("");
  }, [email]);

  useEffect(() => {
    if (userDocId && userDocData) shareProject();
  }, [userDocId, userDocData]);

  const checkEmail = async () => {
    if (email) {
      console.log(email);
      // find if email is a user already
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserDocId(doc.id);
        setUserDocData(doc.data());
      });
      if (querySnapshot.empty) {
        setError("No user with this email. Please Check Again");
      }
    } else setError("Email can not be empty!");
  };

  const shareProject = async () => {
    if (userDocData.projects.includes(projectId)) {
      setError("User already has this project");
    } else {
      const userDocRef = doc(db, "users", userDocId);
      await updateDoc(userDocRef, {
        projects: arrayUnion(projectId),
      }).then(() => {
        toast({
          // title: "Account created.",
          // description: "We've created your account for you.",
          status: "success",
          duration: 7000,
          isClosable: true,
          render: () => (
            <Flex
              borderRadius="lg"
              alignItems="center"
              flexDir="row"
              justifyContent={"center"}
              backgroundColor="brand.100"
            >
              <Text m={3} color="gray.100">
                Project Shared Successfully!
              </Text>
            </Flex>
          ),
        });
        onClose();
      });
      
    }
  };

  return (
    <>
      <Flex alignItems={"center"} cursor={"pointer"} onClick={onOpen}>
        <Icon as={AiOutlineUserAdd} fontSize="22" color={"gray.500"} />
        <Text pl={0.5} fontSize={12} color={"gray.500"}>
          Share
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader textAlign={"center"}>Edit Project</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Share Project
            </FormLabel>
            <FormControl>
              <FormLabel>User Email</FormLabel>
              <Input
                value={email}
                variant="outline"
                fontSize={"md"}
                size={"sm"}
                borderRadius={"lg"}
                focusBorderColor={"black"}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
            <Text color="red" fontSize={"10pt"}>
              {error}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Spacer />
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={checkEmail}
                isLoading={loading}
              >
                Share
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ShareProjectButton;
