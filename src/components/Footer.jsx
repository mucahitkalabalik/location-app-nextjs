// components/Footer.js
import { Box, Text, Link, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={4}>
      <Container maxW="container.lg" textAlign="center">
        <Link
          href="https://github.com/mucahitkalabalik/location-app-nextjs"
          isExternal
          color="blue.400"
          _hover={{ color: 'blue.600' }}
        >
          GitHub Repository
        </Link>
      </Container>
    </Box>
  );
};

export default Footer;
