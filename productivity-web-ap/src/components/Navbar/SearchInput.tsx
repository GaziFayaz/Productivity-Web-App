import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
  // user:
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex align={"center"}>
      <InputGroup>
        <InputLeftElement
          fontSize={"18px"}
          pb={"7px"}
          pointerEvents="none"
          children={<SearchIcon color="gray.100" />}
        />
        <Input
          type="tel"
          placeholder="Search"
          borderWidth="0px"
          borderRadius={"5"}
          height={"30px"}
          width={"180px"}
          bg="#FFFFFF33"
          _placeholder={{ color: "gray.100", fontSize: "15px" }}
          _hover={{ bg: "#FFFFFF33", _placeholder: { color: "gray.300" } }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "gray.100",
          }}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
