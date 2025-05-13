"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Heading, 
  Input, 
  Button, 
  VStack, 
  Text, 
  FormControl, 
  FormLabel,
  FormHelperText,
  Card,
  CardBody
} from "@chakra-ui/react";
import { useLocations } from "@/hooks/useLocations";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

/**
 * Add new location page
 */
export default function Add() {
  const router = useRouter();
  const { createLocation } = useLocations();
  const [clickedPosition, setClickedPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [markerColor, setMarkerColor] = useState("#ff0000");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle save button click
   */
  const handleSave = async () => {
    if (!clickedPosition || !locationName.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await createLocation({
        name: locationName.trim(),
        position: clickedPosition,
        color: markerColor,
      });

      if (success) {
        router.push("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={6} px={4}>
      <Card 
        bg="white" 
        shadow="md" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
      >
        <CardBody>
          <Heading mb={6} size="lg">
            Konum Ekle
          </Heading>

          <Box mb={6} borderRadius="md" overflow="hidden">
            <MapComponent
              onClickMap={setClickedPosition}
              location={clickedPosition}
              markerColor={markerColor}
            />
          </Box>

          {clickedPosition && (
            <Box mb={4} p={3} borderRadius="md" bg="gray.50">
              <Text fontWeight="bold">Seçilen Koordinat:</Text>
              <Text>Enlem: {clickedPosition.lat.toFixed(6)}</Text>
              <Text>Boylam: {clickedPosition.lng.toFixed(6)}</Text>
            </Box>
          )}

          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Konum İsmi</FormLabel>
              <Input
                placeholder="Örn: Ev, İş, Park"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
              <FormHelperText>Konum için hatırlatıcı bir isim girin</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>İşaretçi Rengi</FormLabel>
              <Input
                type="color"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
                w="100px"
                h="50px"
                p={1}
                border="none"
                cursor="pointer"
              />
            </FormControl>

            <Button 
              colorScheme="teal" 
              onClick={handleSave} 
              isDisabled={!clickedPosition || !locationName.trim() || isSubmitting}
              isLoading={isSubmitting}
              mt={2}
            >
              Konumu Kaydet
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
