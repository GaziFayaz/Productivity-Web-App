import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        color={"brand.100"}
        bgColor={"gray.100"}
        borderColor={"brand.100"}
        borderWidth={"2px"}
        height={"28px"}
        borderRadius={"60px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        _hover={{ color: "gray.100", bgColor: "brand.100" }}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        ml={"8px"}
        color={"gray.100"}
        bgColor={"brand.100"}
        height={"28px"}
        borderRadius={"60px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        _hover={{ borderColor: "blue.500", borderWidth: "2px" }}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
