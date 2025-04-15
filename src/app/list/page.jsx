"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocations } from "../../store/locationsSlice";
import {
  Box,
  Stack,
  Text,
  IconButton,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LocationList() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    dispatch(setLocations(savedLocations));
  }, [dispatch]);

  const toggleDetails = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const goToEdit = (id) => {
    router.push(`/locations/edit/${id}`);
  };

  return (
    <Stack spacing={6}>
    <Stack spacing={4} direction="row" justifyContent="space-between" alignItems="center">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mx="auto"> 
        Konum Listesi
      </Text>
    </Stack>
  
    <Stack spacing={2} w="100%" maxW="600px" mx="auto" px={4}>
      {locations.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          Henüz adres eklenmedi.
        </Text>
      ) : (
        locations.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            shadow="sm"
            _hover={{ shadow: "md" }}
          >
            <HStack alignItems="center" spacing={4}>
              <Text fontWeight="semibold">{item.name}</Text>
  
              <FaMapMarkerAlt
                color={item.color || "gray"}
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => toggleDetails(index)}
              />
  
              {expandedIndex === index && (
                <Text fontSize="sm" color="gray.600">
                  📍 {item.position.lat}, {item.position.lng}
                </Text>
              )}
  
              <Spacer />
  
              <IconButton
                aria-label="Search database"
                size="sm"
                onClick={() => goToEdit(item.id)}
              >
                <FaChevronRight />
              </IconButton>
            </HStack>
          </Box>
        ))
      )}
    </Stack>
  </Stack>
  
  
  );
}
