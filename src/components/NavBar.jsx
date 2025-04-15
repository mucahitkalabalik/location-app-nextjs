'use client'
import { Box, Flex, Heading, Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';  // Next.js Link kullanarak sayfalar arası geçiş

export default function Navbar() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" justify="space-between">
        <Heading color="white" size="lg">
          MyApp
        </Heading>
        <Flex>
          <Link as={NextLink} href="/" passHref>
            <Button colorScheme="teal" variant="ghost" mr={4}>
              Home
            </Button>
          </Link>
          <Link as={NextLink} href="/add" passHref>
            <Button colorScheme="teal" variant="ghost">
              Add
            </Button>
          </Link>
          <Link as={NextLink} href="/list" passHref>
            <Button colorScheme="teal" variant="ghost">
              List
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
