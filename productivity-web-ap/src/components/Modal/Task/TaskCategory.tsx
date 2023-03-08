import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  // ChevronDownIcon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {};

const TaskCategory = (props: Props) => {
  let cats = "Home work";
  const [category, setCategory] = useState("Inbox");
  const handleChangecategtory = (e: any) => {
    setCategory(e.target.name);
  };
  return (
    <div>
      <Menu>
        <MenuButton fontSize="xs" as={Button} rightIcon={<ChevronDownIcon />}>
          {category}
        </MenuButton>
        <MenuList>
          {/* category will be imported from database */}
          <MenuItem onClick={handleChangecategtory} name={cats}>
            {cats}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default TaskCategory;
