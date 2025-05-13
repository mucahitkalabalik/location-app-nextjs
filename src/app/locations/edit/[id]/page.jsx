"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Card,
  CardBody,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useLocations } from "@/hooks/useLocations";
import dynamic from "next/dynamic";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

/**
 * Edit location page
 */
export default function EditLocationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getLocation, editLocation, deleteLocation } = useLocations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load location data
  useEffect(() => {
    const locationData = getLocation(id);
    if (locationData) {
      setLocation({ lat: locationData.position.lat, lng: locationData.position.lng });
      setName(locationData.name);
      setColor(locationData.color || "#ff0000");
    }
  }, [id, getLocation]);

  // Handle update submission
  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("İsim boş bırakılamaz!");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await editLocation(id, {
        name: name.trim(),
        color,
        position: location
      });

      if (success) {
        router.push("/list");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const success = await deleteLocation(id);
      if (success) {
        router.push("/list");
      }
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!location) {
    return (
      <Box p={6} maxW="600px" mx="auto">
        <Card bg="white" shadow="md" borderRadius="lg">
          <CardBody>
            <Heading mb={4}>Konum Düzenle</Heading>
            <Text color="red.500">
              Konum bulunamadı!
            </Text>
            <Button 
              mt={4} 
              onClick={() => router.push("/list")}
              colorScheme="blue"
            >
              Listeye Dön
            </Button>
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Card 
        bg="white" 
        shadow="md" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
      >
        <CardBody>
          <Heading mb={6}>Konumu Düzenle</Heading>

          <VStack spacing={4} align="stretch">
            <Box mb={4} borderRadius="md" overflow="hidden">
              <MapComponent onClickMap={setLocation} location={location} markerColor={color} />
            </Box>

            <FormControl isRequired>
              <FormLabel>Konum İsmi</FormLabel>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Konum adı"
              />
              <FormHelperText>Konum için hatırlatıcı bir isim girin</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>İşaretçi Rengi</FormLabel>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                w="100px"
                h="50px"
                p={1}
                border="none"
                cursor="pointer"
              />
            </FormControl>

            <HStack spacing={4} mt={2}>
              <Button 
                colorScheme="teal" 
                onClick={handleUpdate} 
                isLoading={isSubmitting}
                isDisabled={isSubmitting || !name.trim()}
                flex="1"
              >
                Güncelle
              </Button>
              
              <Button 
                colorScheme="red" 
                variant="outline"
                onClick={onOpen}
                isDisabled={isSubmitting || isDeleting}
                flex="1"
              >
                Sil
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Konumu Sil
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                "{name}" konumunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                İptal
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDelete} 
                ml={3}
                isLoading={isDeleting}
              >
                Sil
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
