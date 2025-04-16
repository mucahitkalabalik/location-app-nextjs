"use client";
import { Box, HStack, Text, IconButton, Spacer } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

const LocationItem = ({ item, index, expandedIndex, toggleDetails, goToEdit }) => (
  <Box
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
        aria-label="Edit location"
        size="sm"
        onClick={() => goToEdit(item.id)}
      >
        <FaChevronRight />
      </IconButton>
    </HStack>
  </Box>
);

export default LocationItem;
