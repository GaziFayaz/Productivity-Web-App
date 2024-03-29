import { AddIcon } from "@chakra-ui/icons";
import { Flex, Grid, Icon, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaInbox } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { RiInboxFill, RiCalendar2Line } from "react-icons/ri";
import { MdAssignment, MdCalendarToday } from "react-icons/md";
import ProjectModalIcon from "../Modal/Project/ProjectModalIcon";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";
import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Transaction,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { get } from "http";
import { Router } from "next/router";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [userProjects, setUserProjects] = useState([]);
  const [projectsArray, setProjectsArray] = useState({});

  useEffect(() => {
    getUserProjects();
  }, [user]);

  useEffect(() => {
    getProjects();
    // console.log("copying porject", projectsArray);
  }, [userProjects]);

  const getUserProjects = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        console.log(userSnap.data().projects);
        setUserProjects(userSnap.data().projects);
      }
    }
  };

  const getProjects = () => {
    Object.keys(userProjects).map(async (projectId, index) => {
      // console.log("ProjectID: ", userProjects[projectId])
      // console.log("index: ", index)
      const projectRef = doc(db, "projects", userProjects[projectId]);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists() && projectSnap.data().projectName != "inbox") {
        setProjectsArray((current) => ({
          ...current,
          [projectSnap.id]: projectSnap.data(),
        }));
      }
    });
  };

  const refresh = () => {
    Router.reload();
  };

  return (
    <Flex
      w={"20%"}
      flexDir="column"
      alignItems="left"
      backgroundColor="#FAFAFA"
      h="100vh"
      // color="#fff"
      pl={5}
    >
      <Flex flexDir={"column"}>
        <Flex
          flexDir={"column"}
          align="flex-start"
          justifyContent="left"
          paddingTop="10"
        >
          <Flex className="sidebar-items">
            <Link href="">
              <Icon as={RiInboxFill} color="blue.400" fontSize="22" />
            </Link>
            <Link href="/inbox" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Inbox</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" paddingTop="2">
            <Link href="">
              <Icon as={MdAssignment} color="green.400" fontSize="22" />
            </Link>
            <Link href="/today" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Today</Text>
            </Link>
          </Flex>

          <Flex className="sidebar-items" paddingTop="2">
            <Link href="">
              <Icon as={RiCalendar2Line} color="purple.500" fontSize="21" />
            </Link>
            <Link href="/upcoming" _hover={{ textDecor: "none" }}>
              <Text marginLeft="1em">Upcoming</Text>
            </Link>
          </Flex>
        </Flex>

        {/* personal projects */}

        <Flex className="projects" paddingTop="10" alignItems={"center"}>
          <Text fontSize="md" fontWeight={"semibold"}>
            Projects
          </Text>
          <Spacer />
          <ProjectModalIcon />
        </Flex>
        <Flex flexDir={"column"} pt={2} pl={2} gap={2}>
          {Object.keys(projectsArray).map((projectId, index) => {
            return (
              <Link href={`/projects/${projectId}`} onClick={refresh}>
                <Flex key={index} justifyContent={"left"} alignItems={"center"} gap={2}>
                  <FiCircle
                    className="projectColor"
                    fill={projectsArray[projectId].colorValue}
                    color={projectsArray[projectId].colorValue}
                    fontSize={10}
                  />
                  <Text className="projectName">
                    {projectsArray[projectId].projectName}
                  </Text>
                  <Spacer />
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
