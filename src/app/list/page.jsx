"use client";
<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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
<<<<<<< HEAD
=======
  Flex,
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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

<<<<<<< HEAD
=======
/**
 * Location list page
 */
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
export default function LocationList() {
  const { locations, loadLocations, deleteLocation } = useLocations();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
<<<<<<< HEAD
  const cancelRef = useRef();

  // Load locations (only in client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      loadLocations();
    }
  }, [loadLocations]);

  // Get user location
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Konum alınamadı:", error);
        }
      );
    }
  }, []);
=======
  const cancelRef = React.useRef();

  // Load locations from storage
  useEffect(() => {
    loadLocations();
  }, [loadLocations]);
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de

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

<<<<<<< HEAD
=======
  // Confirm deletion
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
  const confirmDelete = (location) => {
    setLocationToDelete(location);
    onOpen();
  };

<<<<<<< HEAD
=======
  // Handle deletion
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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
<<<<<<< HEAD
                <HStack spacing={4} alignItems="center">
                  <FaMapMarkerAlt
                    color={item.color || "gray"}
                    size={20}
                    style={{ flexShrink: 0 }}
=======
                <HStack alignItems="center" spacing={4}>
                  <FaMapMarkerAlt
                    color={item.color || "gray"}
                    size={20}
                    style={{ cursor: "pointer", flexShrink: 0 }}
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
                  />
                  <Text fontWeight="semibold" noOfLines={1}>
                    {item.name}
                  </Text>

                  {userLocation && (
                    <Badge colorScheme="green" ml={2}>
<<<<<<< HEAD
                      {calculateDistance(userLocation, item.position).toFixed(1)} km
=======
                      {calculateDistance(
                        userLocation,
                        item.position
                      ).toFixed(1)}{" "}
                      km
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
                    </Badge>
                  )}

                  <Spacer />

                  <IconButton
                    icon={<FaMapMarkerAlt />}
<<<<<<< HEAD
                    aria-label="Detayları göster"
=======
                    aria-label="Show details"
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
                    onClick={() => toggleDetails(index)}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                  />
                  <IconButton
                    icon={<FaPencilAlt />}
<<<<<<< HEAD
                    aria-label="Konumu düzenle"
=======
                    aria-label="Edit location"
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
                    onClick={() => goToEdit(item.id)}
                    size="sm"
                    colorScheme="teal"
                  />
                  <IconButton
                    icon={<FaTrash />}
<<<<<<< HEAD
                    aria-label="Konumu sil"
=======
                    aria-label="Delete location"
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
                    onClick={() => confirmDelete(item)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  />
                </HStack>

                {expandedIndex === index && (
<<<<<<< HEAD
                  <Box mt={4} p={3} bg="gray.50" borderRadius="md">
                    <Text fontSize="sm">
                      Konum: {item.position.lat.toFixed(6)}, {item.position.lng.toFixed(6)}
=======
                  <Box
                    mt={4}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontSize="sm">
                      Konum: {item.position.lat.toFixed(6)},{" "}
                      {item.position.lng.toFixed(6)}
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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

<<<<<<< HEAD
      {/* Silme Onay Dialogu */}
=======
      {/* Delete confirmation dialog */}
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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
<<<<<<< HEAD
            <AlertDialogBody>
              <Text>
                "{locationToDelete?.name}" konumunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </Text>
            </AlertDialogBody>
=======

            <AlertDialogBody>
              <Text>
                "{locationToDelete?.name}" konumunu silmek istediğinizden emin
                misiniz? Bu işlem geri alınamaz.
              </Text>
            </AlertDialogBody>

>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
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
