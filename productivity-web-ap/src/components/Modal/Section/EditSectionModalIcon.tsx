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
import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCircle, FiPlusSquare } from "react-icons/fi";
import { useRouter } from "next/router";

const EditSectionModalIcon: React.FC = (sectionId) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    // console.log("SectionId ", sectionId.section.sectionName)
    setSectionName(sectionId.section.sectionName)
  },[])

  const handleChangeSectionName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(event.target.value);
  }

  const handleUpdateSection = async () => {
    if (error) setError("");
    setLoading(true);

    try {
      // Create the section document in firestore

      const sectionDocRef = doc(db, "sections", sectionId.sectionId);
      await updateDoc(sectionDocRef, {
        sectionName: sectionName
      });
      router.reload()
      onClose()
    } catch (error: any) {
        console.log("handleUpdateSection error", error)
        setError(error.message)
    }
    setLoading(false)
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
          {/* <ModalHeader textAlign={"center"}>Edit Section</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Edit Section
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
                onClick={handleUpdateSection}
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

export default EditSectionModalIcon;
