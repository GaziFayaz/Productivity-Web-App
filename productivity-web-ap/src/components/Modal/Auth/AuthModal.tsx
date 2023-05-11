import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilState } from "recoil";
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";
import ResetPassword from "./ResetPassword";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { Router } from "next/router";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [checkUser, setCheckUser] = useState(false)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect( () => {
    if (user) {
      console.log("user", user);
      addUser()
    }
  }, [user]);

  useEffect ( () => {
    if(checkUser) {
      handleClose();
    }
  }, [checkUser])

  const addUser = async () => {
    if(user){
      const userDocRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userDocRef)
      if(!userSnap.exists()){

        // const inboxSection = {

        // }

        // const inboxProject = {
        //   creatorId: user?.uid,
        //   createdAt: serverTimestamp(),
        //   projectName:"inbox",
        //   color:"1",
        //   colorValue: "1",
        //   numberOfMembers: 1,
        //   members: [user?.uid],
        //   numberOfSections: 1,
        //   // sections: [section]
        // }
        const displayName = user.displayName? user.displayName : user.email
        const userData= {
          email: user.email,
          name: displayName,
          projects: [],
        }
        await setDoc(userDocRef, userData)
        .then(() => {
          setCheckUser(true)
        })
        .catch(() => {
          console.log("Adding New User to Database Failed")
        })
      }
      else setCheckUser(true)
    }
    
    
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color={"gray.500"} fontWeight={700}>
                    OR
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
