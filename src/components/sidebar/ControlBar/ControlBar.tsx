import { useParams } from "react-router";
import { ToolButton } from "../../buttons/ToolButton";
import { BlurryBackground } from "../../data-containers/BlurryBackground";
import { useFetchAllCharacters } from "../../../hooks/useFetchCharacter";
import locate from '../../../assets/locate.png';
import { filterIcon, findIcon, homeIcon, shareIcon } from "../../../svgIcons";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, type RefObject } from "react";
import { OpenSearch } from "./OpenSearch";
import { LocateCharacter } from "./LocateCharacter";
import { NavigateHome } from "./NavigateHome";
import { useFilteredStore } from "../../../store/useFilteredStore";
import { OpenFilter } from "./OpenFilter";


const style: React.CSSProperties = {
  position: 'sticky',
  top: '0',
  display: 'flex',
  padding: '0.4rem',
  borderRadius: '100px',
  width: 'fit-content',
  gap: '0.2rem',
  zIndex: 2,
  marginTop: '1rem',
};

interface ControlBarProps {
  wrapperRef: RefObject<HTMLDivElement | null>;
  targetRef: RefObject<HTMLDivElement | null>;
}

export const ControlBar = ({ wrapperRef, targetRef }: ControlBarProps) => {
  const { id: characterID } = useParams();
  const { data: characters } = useFetchAllCharacters();
  
  const filteredData = useFilteredStore(state => state.filteredData);
  

  const stickyRef = useRef<HTMLDivElement>(null);
  const [isPastTarget, setIsPastTarget] = useState(false);

  const { scrollY } = useScroll({
    container: wrapperRef 
  });

  useMotionValueEvent(scrollY, "change", () => {
    if (stickyRef.current && targetRef.current && wrapperRef.current) {
      const containerTop = wrapperRef.current.getBoundingClientRect().top;
      const stickyTop = stickyRef.current.getBoundingClientRect().top - containerTop;
      const targetTop = targetRef.current.getBoundingClientRect().top - containerTop;

      const shouldBePast = stickyTop > targetTop;
      if (shouldBePast !== isPastTarget) {
        setIsPastTarget(shouldBePast);
      }
    }
  });
  


  const onCopyHref = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  const currentStyle: React.CSSProperties = {
  ...style,
  backgroundColor: isPastTarget ? 'var(--blur-bg-Layered)' : 'var(--blur-bg)',
  transition: 'background-color 0.3s ease',
};

  const currentCharacter = characters.find(character => character.id === Number(characterID));

  const showHome = filteredData || currentCharacter;
  return (
    <BlurryBackground elementTag="menu" ref={stickyRef} style={currentStyle} className="sidebar-toolbar">
      { showHome && 
        <NavigateHome>
          {({onStartPage}) => (
          <ToolButton title="На главную" onClick={onStartPage}>
            { homeIcon }
          </ToolButton>
          )}
        </NavigateHome>
      }
      { currentCharacter && 
        <LocateCharacter>
          {({onLocate}) => (
          <ToolButton title="Показать на карте" onClick={onLocate}>
            <img style={{transform: 'scale(0.7)'}} src={locate} alt="" />
          </ToolButton>
          )}
        </LocateCharacter>
      }

      <ToolButton title="Поделиться" onClick={onCopyHref}>
        { shareIcon }
      </ToolButton>

      <OpenSearch>
        {({ open, isOpen }) => (
          <ToolButton disabled={isOpen} onClick={open} title="Найти">
            { findIcon }
          </ToolButton>
        )}
      </OpenSearch>
      
      <OpenFilter>
        {({ open, isOpen }) => (
        <ToolButton disabled={isOpen} onClick={open} title="Отфильтровать">
          { filterIcon }
        </ToolButton>
        )}
      </OpenFilter>
    </BlurryBackground>
  );
};
