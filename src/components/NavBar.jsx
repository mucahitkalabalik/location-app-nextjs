"use client";
import { Box, Flex, Heading, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" justify="space-between">
        <Heading color="white" size="lg">
        <Link as={NextLink} href="/" passHref>
            <Button colorScheme="teal" variant="ghost" mr={4}>
              Location App
            </Button>
          </Link>
        </Heading>
        <Flex>
          <Link as={NextLink} href="/add" passHref>
            <Button colorScheme="teal" variant="ghost">
              Ekle
            </Button>
          </Link>
          <Link as={NextLink} href="/list" passHref>
            <Button colorScheme="teal" variant="ghost">
              Liste
            </Button>
          </Link>
          <Link as={NextLink} href="/locations" passHref>
            <Button colorScheme="teal" variant="ghost">
              Konumlar
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
