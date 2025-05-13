"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Stack,
  Text,
  IconButton,
  Heading,
  HStack,
  Spacer,
  Card,
  CardBody,
  Badge,
  Flex,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useLocations } from "@/hooks/useLocations";
import { calculateDistance } from "@/utils/mapUtils";

/**
 * Location list page
 */
export default function LocationList() {
  const { locations, loadLocations, deleteLocation } = useLocations();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const cancelRef = React.useRef();

  // Load locations from storage
  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  // Get user's location for distance calculation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Toggle location details
  const toggleDetails = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // Navigate to edit page
  const goToEdit = (id) => {
    router.push(`/locations/edit/${id}`);
  };

  // Confirm deletion
  const confirmDelete = (location) => {
    setLocationToDelete(location);
    onOpen();
  };

  // Handle deletion
  const handleDelete = async () => {
    if (locationToDelete) {
      await deleteLocation(locationToDelete.id);
      setLocationToDelete(null);
      onClose();
    }
  };

  return (
    <Box maxW="800px" mx="auto" py={6} px={4}>
      <Heading size="lg" mb={6}>
        Konum Listesi
      </Heading>

      <Stack spacing={4}>
        {locations.length === 0 ? (
          <Card bg="white" shadow="md">
            <CardBody>
              <Text textAlign="center" color="gray.500">
                Henüz konum eklenmedi.
              </Text>
              <Button
                colorScheme="teal"
                onClick={() => router.push("/add")}
                mt={4}
                mx="auto"
                display="block"
              >
                Konum Ekle
              </Button>
            </CardBody>
          </Card>
        ) : (
          locations.map((item, index) => (
            <Card
              key={item.id}
              bg="white"
              shadow="sm"
              _hover={{ shadow: "md" }}
              transition="all 0.2s"
            >
              <CardBody>
                <HStack alignItems="center" spacing={4}>
                  <FaMapMarkerAlt
                    color={item.color || "gray"}
                    size={20}
                    style={{ cursor: "pointer", flexShrink: 0 }}
                  />
                  <Text fontWeight="semibold" noOfLines={1}>
                    {item.name}
                  </Text>

                  {userLocation && (
                    <Badge colorScheme="green" ml={2}>
                      {calculateDistance(
                        userLocation,
                        item.position
                      ).toFixed(1)}{" "}
                      km
                    </Badge>
                  )}

                  <Spacer />

                  <IconButton
                    icon={<FaMapMarkerAlt />}
                    aria-label="Show details"
                    onClick={() => toggleDetails(index)}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                  />
                  <IconButton
                    icon={<FaPencilAlt />}
                    aria-label="Edit location"
                    onClick={() => goToEdit(item.id)}
                    size="sm"
                    colorScheme="teal"
                  />
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete location"
                    onClick={() => confirmDelete(item)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  />
                </HStack>

                {expandedIndex === index && (
                  <Box
                    mt={4}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontSize="sm">
                      Konum: {item.position.lat.toFixed(6)},{" "}
                      {item.position.lng.toFixed(6)}
                    </Text>
                    {item.createdAt && (
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Eklenme: {new Date(item.createdAt).toLocaleString()}
                      </Text>
                    )}
                  </Box>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </Stack>

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
                "{locationToDelete?.name}" konumunu silmek istediğinizden emin
                misiniz? Bu işlem geri alınamaz.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                İptal
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Sil
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
