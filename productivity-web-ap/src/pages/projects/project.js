import {
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import TaskModalButton from "@/components/Modal/Task/TaskModalButton";
import SectionModalIcon from "@/components/Modal/Section/SectionModalIcon";
import { useRouter } from "next/router";
import { FiPlusSquare } from "react-icons/fi";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const Project = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("")
  const [sectionAdd, setSectionAdd] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData =async () => {

    const q = query(collection(firestore, "projects"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setProjectName(doc.data().projectName)
  forEach
});
    return () => {};
  };

  const handleOpenAddSection = () => {
    setSectionAdd(true);
  };
  return (
    <Flex
      height={"100vh"}
      maxWidth={"2000px"}
      flexDir={"column"}
      pt={10}
      pl={20}
      pr={20}
      pb={10}
    >
      <Flex className="projectContent" flexDir={"column"} w="55vw">
        <Flex className="ProjectHeader" alignItems={"center"}>
          <Text className="ProjectName" fontSize={"larger"} fontWeight={"bold"}>
            {projectName}
            {/* {router.pathname}
            Education */}
          </Text>
          <Spacer />
          <HStack spacing="20px">
            <Flex alignItems={"center"}>
              <Icon as={AiOutlineUserAdd} fontSize="22" color={"gray.500"} />
              <Text pl={0.5} fontSize={12} color={"gray.500"}>
                Share
              </Text>
            </Flex>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={
                  <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
                }
              />
              <MenuList>
                <MenuItem>Edit Name</MenuItem>
                <MenuItem>Share</MenuItem>
                <MenuItem>Add Section</MenuItem>
                <MenuItem textColor={"red"}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Flex className="projectBody" mr={10} mt={10}>
          <Flex className="sections" flexDir={"column"} gap={4}>
            <Flex className="sectionContent" flexDir={"column"} w={278} p={1}>
              <Flex
                className="sectionHeader"
                flexGrow={1}
                alignItems={"center"}
              >
                <Text
                  className={"sectionTitle"}
                  fontWeight={"bold"}
                  fontSize={"sm"}
                >
                  Section
                </Text>
                <Text
                  className="sectionTaskCount"
                  pl={2}
                  color={"gray.400"}
                  fontSize={"sm"}
                >
                  3
                </Text>
                <Spacer />
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
                    }
                  />
                  <MenuList>
                    <MenuItem>Edit Name</MenuItem>
                    <MenuItem>Share</MenuItem>
                    <MenuItem>Add Section</MenuItem>
                    <MenuItem textColor={"red"}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Flex className="sectionBody">
                <TaskModalButton />
              </Flex>
            </Flex>
            <Flex className="sectionContent" flexDir={"column"} w={278} p={1}>
              <Flex
                className="sectionHeader"
                flexGrow={1}
                alignItems={"center"}
              >
                <Text
                  className={"sectionTitle"}
                  fontWeight={"bold"}
                  fontSize={"sm"}
                >
                  Section
                </Text>
                <Text
                  className="sectionTaskCount"
                  pl={2}
                  color={"gray.400"}
                  fontSize={"sm"}
                >
                  3
                </Text>
                <Spacer />
                <Icon as={SlOptions} fontSize="18" color={"gray.500"} />
              </Flex>
              <Flex className="sectionBody">
                <TaskModalButton />
              </Flex>
            </Flex>
            {sectionAdd ? <div></div> : <SectionModalIcon />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Project;
