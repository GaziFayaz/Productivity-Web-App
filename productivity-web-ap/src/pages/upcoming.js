import {
  Button,
  Flex,
  Spacer,
  Text,
  Icon,
  useToast,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosRadioButtonOff } from "react-icons/io";
// import DateTimePicker from "react-datetime-picker";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DatetimePicker from "../components/Modal/Task/DatetimePicker";
export default function Upcoming() {
  var today = new Date();
  var date =
    today.toLocaleString("default", { month: "long" }) + " " + today.getDate();
  const toast = useToast();
  const [value, onChange] = useState(new Date());
  const completeTask = () => {
    toast({
      // title: "Account created.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
      render: () => (
        <Flex
          borderRadius="lg"
          alignItems="center"
          flexDir="row"
          backgroundColor="brand.100"
        >
          <Text ml="2" color="gray.100">
            Task completed
          </Text>
          <Spacer />
          <Button
            textColor="gray.100"
            _hover={{ backgroundColor: "brand.100" }}
            p={3}
            bg="brand.100"
          >
            Undo
          </Button>
        </Flex>
      ),
    });
  };
  return (
    <Flex w="80vw" flexDir={"column"} pt={10} pl={20} pr={20} pb={10}>
      <Flex className="upcomingContent" flexDir={"column"} w="55vw">
        <Flex className="upcomingHeader" alignItems={"center"} flexDir="row">
          <Menu isLazy>
            <MenuButton as={Heading} size="lg" cursor={"pointer"}>
              <Flex flexDir={"row"}>
                {value.toLocaleString("default", { month: "long" }) +
                  " " +
                  value.getDate()}
                <ChevronDownIcon
                  cursor={"pointer"}
                  marginLeft="1"
                  marginTop="2"
                  w={5}
                  h={5}
                />
              </Flex>
            </MenuButton>

            <MenuList>
              <DateTimePicker value={value} onChange={onChange} />
            </MenuList>
          </Menu>
        </Flex>
        <Flex className="upcomingBody" pr={10} pt={10} flexDir="column">
          <Heading as="md" size="md">
            Overdue
          </Heading>
          <Flex flexDir={"row"} paddingTop="4">
            <Flex flexDir={"row"} gap="2" flexGrow={1}>
              <Flex>
                <Icon
                  as={IoIosRadioButtonOff}
                  fontSize="22"
                  color={"red.500"}
                  paddingTop="1"
                  cursor="pointer"
                  onClick={completeTask}
                />
              </Flex>

              <Flex flexDir={"column"}>
                {/* task1 */}
                <Text>sdaaaaaaasada asdassadasdasdasdasdasdasda</Text>
                <Text fontSize="xs">20 march</Text>
              </Flex>
            </Flex>

            {/* edit,delete section */}
            <Flex ml={20}>
              <Icon as={AiOutlineEdit} fontSize="18" color={"gray.500"} />
            </Flex>
          </Flex>
          <Flex flexDir={"row"} paddingTop="4">
            <Flex flexDir={"row"} gap="2" flexGrow={1}>
              <Flex>
                <Icon
                  as={IoIosRadioButtonOff}
                  fontSize="22"
                  color={"red.500"}
                  paddingTop="1"
                  cursor="pointer"
                  onClick={completeTask}
                />
              </Flex>

              <Flex flexDir={"column"}>
                {/* task1 */}
                <Text>sdaaaaaaasada asdassadasdasdasdasdasdasda</Text>
                <Text fontSize="xs">20 march</Text>
              </Flex>
            </Flex>

            {/* edit,delete section */}
            <Flex ml={20}>
              <Icon as={AiOutlineEdit} fontSize="18" color={"gray.500"} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
