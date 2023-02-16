import { SearchIcon } from "@chakra-ui/icons";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
  // user:
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex align={"center"} >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
