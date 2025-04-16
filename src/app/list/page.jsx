"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLocations } from "../../store/locationsSlice";
import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import LocationItem from "../../components/LocaitonList/listItem";
import { getAllLocations } from "../../services/locationService"; 

const LocationList = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedLocations = getAllLocations();
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
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
            <LocationItem
              key={index}
              item={item}
              index={index}
              expandedIndex={expandedIndex}
              toggleDetails={toggleDetails}
              goToEdit={goToEdit}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default LocationList;
