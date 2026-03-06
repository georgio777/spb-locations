import type { PositionAnchor } from "maplibre-gl";
import { Popup } from "react-map-gl/maplibre";

export interface PopupData {
  lat: number;
  lng: number;
};

interface PopUpComponentProps {
  popUpData: PopupData;
  onClose: () => void;
  anchor?: PositionAnchor;
  children: React.ReactNode;
}


const PopUpComponent = ({popUpData, onClose, anchor = 'bottom-left', children}: PopUpComponentProps) => {
  return (
    <Popup 
    style={{marginLeft: '1rem'}}
    longitude={popUpData.lng} 
    latitude={popUpData.lat}
    anchor={anchor}
    onClose={onClose}>
      { children }
    </Popup>
  );
};

export default PopUpComponent;