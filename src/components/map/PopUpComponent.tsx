import { Popup } from "react-map-gl/maplibre";
import type { PopupData } from "./MapComponent";

interface PopUpComponentProps {
  popUpData: PopupData;
  onClose: () => void;
}

const PopUpComponent = ({popUpData, onClose}: PopUpComponentProps) => {
  return (
    <Popup longitude={popUpData.lng} latitude={popUpData.lat}
      anchor="bottom"
      onClose={onClose}>
      <p>Широта: {popUpData.lat}</p>
      <p>Долгота: {popUpData.lng}</p>
    </Popup>
  );
};

export default PopUpComponent;