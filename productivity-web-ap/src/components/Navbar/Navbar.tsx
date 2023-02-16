import { Flex } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';

const Navbar:React.FC = () => {
    
    return (
        <Flex bg={"brand.100"} height={"44px"} padding={"6px 12px"} >
            <SearchInput />
        </Flex>
    )
}
export default Navbar;