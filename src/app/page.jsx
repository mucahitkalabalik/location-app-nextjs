// pages/index.js
"use client";
import { Box, Button, Heading, Flex, Text, Card, CardBody } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { FaPlus, FaList, FaMapMarkedAlt } from "react-icons/fa";
import { useLocations } from "@/hooks/useLocations";
import { useEffect } from "react";

// Dynamically import the map component with SSR disabled
const MultiMapComponent = dynamic(() => import('@/components/MultiMapComponent'), { ssr: false });

/**
 * Home page component
 */
export default function Home() {
  const { locations, loadLocations } = useLocations();
  
  // Load locations when component mounts
  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  return (
<<<<<<< HEAD
    <Box maxW="1200px" mx="auto" py={6} px={4}>
      <Card 
        bg="white" 
        shadow="md" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
        mb={6}
      >
        <CardBody>
          <Flex justifyContent="space-between" alignItems="center" mb={4} wrap="wrap" gap={2}>
            <Heading size="lg" display="flex" alignItems="center">
              <FaMapMarkedAlt style={{ marginRight: '10px' }} />
              Konumlarınız
              <Text as="span" fontSize="md" fontWeight="normal" ml={2} color="gray.500">
                ({locations.length})
              </Text>
            </Heading>
            
            <Flex gap={2}>
              <Link href="/add" passHref>
                <Button colorScheme="teal" leftIcon={<FaPlus />}>Konum Ekle</Button>
              </Link>
              <Link href="/list" passHref>
                <Button variant="outline" colorScheme="blue" leftIcon={<FaList />}>Listeye Git</Button>
              </Link>
            </Flex>
          </Flex>
          
          <Box 
            borderRadius="lg" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor="gray.200"
          >
            <MultiMapComponent />
          </Box>
          
          {locations.length === 0 && (
            <Box textAlign="center" mt={4} p={4} borderRadius="md" bg="gray.50">
              <Text>Henüz hiç konum eklemediniz. Haritada konum eklemek için "Konum Ekle" butonuna tıklayın.</Text>
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
=======
    <>
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Konumlarınız
      </Heading>
      <MultiMapComponent />
    </Box>
    </>
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
  );
}
