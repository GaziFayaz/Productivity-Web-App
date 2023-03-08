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

type TaskCategoryProps = {};

const TaskCategory: React.FC = () => {
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
          <MenuItem fontSize="xs" onClick={handleChangecategtory} name="Inbox">
            Inbox
          </MenuItem>
          <MenuItem
            fontSize="xs"
            onClick={handleChangecategtory}
            name="Home Work"
          >
            Home Work
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default TaskCategory;
