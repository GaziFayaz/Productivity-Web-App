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
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiCircle, FiPlusSquare } from "react-icons/fi";

const SectionModalIcon: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        fontWeight={"medium"}
        color={"gray.500"}
        _hover={{ color: "brand.100" }}
        fontSize={14}
        onClick={onOpen}
      >
        <Icon as={FiPlusSquare} fontSize={20} />
        <Text width={"24"} fontWeight={"medium"}>
          Add section
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Create your account</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontWeight={"bold"} fontSize={"x-large"} mb={5}>
              Add Section
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
