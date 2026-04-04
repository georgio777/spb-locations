import { useMap } from "react-map-gl/maplibre"
import { useFilteredStore } from "../../store/useFilteredStore";
import { useCallback, useEffect } from "react";
import type { Character } from "../../types/locations.types";
import getMaxMinCoords from "../../utils/getMaxMinCoords";

export const FlyToFiltered = () => {
  const {current: map} = useMap();
  const filteredData = useFilteredStore(state => state.filteredData);
  const DEFAULT_ZOOM = 15

  const flyTo = useCallback(() => {
    if (!filteredData) return;
    if (filteredData.length === 0) return;

    const longitudes: number[] = [];
    const latitudes: number[] = [];

    filteredData.map((loc: Character) => {
      longitudes.push(Number(loc.coords.lng));
      latitudes.push(Number(loc.coords.lat));
    });

    if (filteredData.length === 1) {
      map?.flyTo({center: [longitudes[0], latitudes[0]], zoom: DEFAULT_ZOOM});
    } else {
      const maxMinLongitudes: number[] = getMaxMinCoords(longitudes);
      const maxMinLatitudes: number[] = getMaxMinCoords(latitudes);
      
      const s: number = maxMinLatitudes[1];
      const w: number = maxMinLongitudes[1];
      const n: number = maxMinLatitudes[0];
      const e: number = maxMinLongitudes[0];
      const bbox: [number, number, number, number] = [w, s, e, n];
      
      map?.fitBounds(bbox, {
        padding: {top: 100, bottom: 100, left: 100, right: 100}
      });
    }

  }, [filteredData, map])

  useEffect(() => {
    flyTo();
  }, [filteredData, map, flyTo])

  return null;
}