// pages/index.js
import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>Harita Uygulaması</Heading>
      <Link href="/add">
        <Button colorScheme="blue">Konum Ekle</Button>
      </Link>
    </Box>
  );
}