'use client';
import { useSelector } from "react-redux";
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
  const locations = useSelector((state) => state.locations);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const router = useRouter();

  const toggleDetails = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const goToEdit = (id) => {
    router.push(`/locations/edit/${id}`);
  };

  return (
    <Stack spacing={6}>
      <Button colorScheme="teal" width="fit-content" alignSelf="flex-start">
        Rota Göster
      </Button>

      <Stack spacing={4}>
        {locations.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            shadow="sm"
            _hover={{ shadow: "md" }}
          >
            <HStack alignItems="center" spacing={4}>
          
              <FaMapMarkerAlt
                color={item.color || "gray"}
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => toggleDetails(index)}
              />

              {/* Yer Adı */}
              <Text fontWeight="semibold">{item.name}</Text>

              {expandedIndex === index && (
                <Text fontSize="sm" color="gray.600">
                  📍 {item.position.lat}, {item.position.lng}
                </Text>
              )}

              <Spacer />

      
              <IconButton
                icon={<FaChevronRight />}
                aria-label="Düzenle"
                size="sm"
                variant="ghost"
                onClick={() => goToEdit(item.id)}
              />
            </HStack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
