"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MapComponent from "@/components/MapComponent";
import { Box, Heading, Text, Input, Button, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function EditLocationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    const found = savedLocations.find((loc) => loc.id === id);

    if (found) {
      console.log(found, "found");

      setLocation({ lat: found.position.lat, lng: found.position.lng });
      setName(found.name);
      setColor(found.color || "#ff0000");
    }
  }, [id]);

  const handleUpdate = () => {
    if (!name) {
      toast.error("İsim boş bırakılamaz!", {
        position: "bottom-right",
      });
      return;
    }

    const savedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    console.log(location, "location");
    
    
    const updatedLocations = savedLocations.map((loc) =>
      loc.id === id ? { ...loc, name, color, position: location } : loc
    );

    localStorage.setItem("locations", JSON.stringify(updatedLocations));

    toast.success("Konum başarıyla güncellendi!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    router.push("/list");
  };

  if (!location) {
    return (
      <Box p={6}>
        <Heading>Konum Düzenle</Heading>
        <Text mt={4} color="red.500">
          Konum bulunamadı!
        </Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Heading mb={6}>Konumu Düzenle</Heading>

      <VStack spacing={4} align="stretch">
        <Box mb={4}>
          <MapComponent  onClickMap={setLocation} location={location} />
        </Box>
        <Box>
          <Text>Konum Adı</Text>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Box>

        <Box>
          <Text>İşaretçi Rengi</Text>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            w="100px"
            h="50px"
            p={0}
            border="none"
            cursor="pointer"
          />
        </Box>

        <Button colorScheme="teal" onClick={handleUpdate}>
          Güncelle
        </Button>
      </VStack>
    </Box>
  );
}
