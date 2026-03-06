import { useNavigate, useParams } from "react-router";
import { ToolButton } from "../buttons/ToolButton";
import { BlurryBackground } from "../data-containers/BlurryBackground";
import { useFetchAllCharacters } from "../../hooks/useFetchCharacter";
import locate from '../../assets/locate.png';
import { useMap } from "react-map-gl/maplibre";
import { homeIcon, shareIcon } from "../../svgIcons";


const style = {
  display: 'flex',
  padding: '0.2rem',
  borderRadius: '100px',
  width: 'fit-content',
  height: 'fit-content',
  gap: '0.2rem',
  marginLeft: 'auto',
  marginRight: '1rem',
  backgroundColor: 'rgba(124, 72, 1, 0.2)',
  borderColor: 'var(--border-color-lighten)',
  boxShadow: '0px 0px 2px 1px inset rgba(137, 112, 13, 0.61)'
};

export const ControlBar = () => {
  const { id: characterID } = useParams();
  const { data: characters } = useFetchAllCharacters();
  const { myMap } = useMap();
  const navigate = useNavigate();
  
  const onStartPage = () => {
    navigate('/')
  };

  const onLocate = () => {
    const coords = characters.find(char => char.id === Number(characterID))?.coords;
    myMap?.flyTo({center: [coords?.lng as number, coords?.lat as number], zoom: 18})
  };

  const onCopyHref = () => {
    navigator.clipboard.writeText(window.location.href);
  }
  return (
    <BlurryBackground style={style}>
      <ToolButton title="На главную" onClick={onStartPage}>
        { homeIcon }
      </ToolButton>
      <ToolButton title="Показать на карте" onClick={onLocate}>
        <img style={{transform: 'scale(0.7)'}} src={locate} alt="" />
      </ToolButton>
      <ToolButton title="Поделиться" onClick={onCopyHref}>
        { shareIcon }
      </ToolButton>
    </BlurryBackground>
  );
};
