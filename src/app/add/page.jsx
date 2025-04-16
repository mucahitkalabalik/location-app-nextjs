"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { Box, Heading, Input, Button, VStack, Text } from "@chakra-ui/react";
import { addLocation, setLocations } from "../../store/locationsSlice";
import { getAllLocations } from "../../services/locationService"; 

const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
});

export default function Add() {
  const dispatch = useDispatch();
  const router = useRouter();
  const locations = useSelector((state) => state.locations);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [markerColor, setMarkerColor] = useState("#ff0000");

  useEffect(() => {
    const savedLocations = getAllLocations();
    dispatch(setLocations(savedLocations));
  }, [dispatch]);

  const handleSave = () => {
    if (!clickedPosition || !locationName) {
      alert("Lütfen konum seçin ve bir isim girin!");
      return;
    }

    const newLocation = {
      id: uuidv4(),
      name: locationName,
      position: clickedPosition,
      color: markerColor,
    };

    dispatch(addLocation(newLocation));

    const updatedLocations = [...locations, newLocation];
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    toast("Konum başarıyla kaydedildi!", {
      type: "success",
      position: "bottom-right",
      autoClose: 2000,
    });
    setClickedPosition(null);
    setLocationName("");
    setMarkerColor("#ff0000");
    router.push("/");
  };

  return (
    <Box maxW="600px" mx="auto" py={10} px={4}>
      <Heading mb={6} size="lg">
        Konum Ekle
      </Heading>

      <Box mb={6}>
        <MapComponent
          onClickMap={setClickedPosition}
          markerColor={markerColor}
        />
      </Box>

      {clickedPosition && (
        <Box mb={4}>
          <Text fontWeight="bold">Seçilen Koordinat:</Text>
          <Text>Enlem: {clickedPosition.lat}</Text>
          <Text>Boylam: {clickedPosition.lng}</Text>
        </Box>
      )}

      <VStack spacing={4} align="stretch">
        <Box>
        <Text>Adresi isimlendirin:</Text>
          <Input
            placeholder="Örn: Ev, İş, Park"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </Box>

        <Box>

        <Text>Renk Seçin:</Text>
          <Input
            type="color"
            value={markerColor}
            onChange={(e) => setMarkerColor(e.target.value)}
            w="100px"
            h="50px"
            p={0}
            border="none"
            cursor="pointer"
          />
        </Box>

        <Button colorScheme="teal" onClick={handleSave}>
          Konumu Kaydet
        </Button>
      </VStack>
    </Box>
  );
}
