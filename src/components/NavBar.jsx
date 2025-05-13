"use client";
import { Box, Flex, Heading, Button, Link, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaHome, FaPlus, FaList } from "react-icons/fa";
import PropTypes from 'prop-types';

export default function Navbar() {
  const colorScheme = 'teal';

  return (
    <Box 
      bg="teal.500" 
      p={4} 
      position="sticky" 
      top="0" 
      zIndex="10"
      shadow="md"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Heading color="white" size="lg">
          <Link as={NextLink} href="/" passHref>
            <Button colorScheme={colorScheme} variant="ghost" leftIcon={<FaHome />}>
              Location App
            </Button>
          </Link>
        </Heading>
        <Flex>
          <NavLink href="/add" icon={<FaPlus />} label="Ekle" />
          <NavLink href="/list" icon={<FaList />} label="Liste" />
        </Flex>
      </Flex>
    </Box>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <Link as={NextLink} href={href} passHref>
      <Button
        colorScheme="teal"
        variant="ghost"
        leftIcon={icon}
        color="white"
        _hover={{ bg: 'teal.400' }}
        mr={2}
      >
        {label}
      </Button>
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired
};
