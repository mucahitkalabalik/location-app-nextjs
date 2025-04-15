// pages/index.js
"use client";
import { Box, Button, Heading } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Link from "next/link";
const MultiMapComponent = dynamic(() => import('@/components/MultiMapComponent'), { ssr: false });


export default function Home() {
  return (
    <>
    <Box p={4}>
      <Link href="/add">
        <Button colorScheme="blue">Konum Ekle</Button>
      </Link>
    
    </Box>
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Konumlarınız
      </Heading>
      <MultiMapComponent />
    </Box>
    </>
  );
}
