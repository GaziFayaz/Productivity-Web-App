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
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCircle, FiPlusSquare } from "react-icons/fi";

const SectionModalIcon: React.FC = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectId = router.query.project
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const handleChangeSectionName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(event.target.value);
  }

  const handleCreateSection = async () => {
    if (error) setError("");
    setLoading(true);

    try {
      // Create the section document in firestore

      const data = {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        // fromProject: 
        sectionName: sectionName,
        tasks: [],
        
      };
      const sectionDocRef = doc(collection(db, "sections"));
      await setDoc(sectionDocRef, data);
      const projectDocRef = doc(db, "projects", projectId)
      await updateDoc(projectDocRef, {
        sections: arrayUnion(sectionDocRef.id),
      })
      router.reload()
      onClose()
    } catch (error: any) {
        console.log("handleCreateSection error", error)
        setError(error.message)
    }
    setLoading(false)
  };
  return (
    <>
      <Flex
        className="AddSection"
        flexDir={"row"}
        gap={1}
        justifyContent={"center"}
        fontWeight={"medium"}
        color={"gray.500"}
        _hover={{ color: "brand.100" }}
        fontSize={14}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Icon as={FiPlusSquare} fontSize={20} color={"brand.100"} />
        <Text  fontWeight={"medium"}>
          Add section
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader textAlign={"center"}>Create a New Section</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Create New Section
            </FormLabel>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={sectionName}
                variant="outline"
                fontSize={"md"}
                size={"sm"}
                borderRadius={"lg"}
                focusBorderColor={"black"}
                onChange={handleChangeSectionName}
              />
            </FormControl>

            
          </ModalBody>

          <ModalFooter>
            <Spacer />
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleCreateSection}
                isLoading={loading}
              >
                Add Section
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SectionModalIcon;
