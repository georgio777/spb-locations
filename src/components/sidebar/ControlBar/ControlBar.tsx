import { useParams } from "react-router";
import { ToolButton } from "../../buttons/ToolButton";
import { BlurryBackground } from "../../data-containers/BlurryBackground";
import { useFetchAllCharacters } from "../../../hooks/useFetchCharacter";
import locate from '../../../assets/locate.png';
import { homeIcon, shareIcon } from "../../../svgIcons";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { memo, useRef, useState, type RefObject } from "react";
import { LocateCharacter } from "./LocateCharacter";
import { NavigateHome } from "./NavigateHome";
import { useFilteredStore } from "../../../store/useFilteredStore";
import './ControlBar.css'
import toast from "react-hot-toast";


interface ControlBarProps {
  wrapperRef: RefObject<HTMLDivElement | null>;
  targetRef: RefObject<HTMLDivElement | null>;
}

export const ControlBar = memo(({ wrapperRef, targetRef }: ControlBarProps) => {
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
  


  const onCopyHref = async () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast(<div className="toast-href"><span>Ссылка скопирована</span> <span>{window.location.href}</span></div>, { id: 'copyHref', duration: 2000});
    } catch(error) {
      if (error instanceof Error) {
        toast(`Ошибка: ${error.message}`);
      } else {
        toast('Произошла неизвестная ошибка');
      }
    }
  }

  const currentStyle: React.CSSProperties = {
  backgroundColor: isPastTarget ? 'var(--blur-bg-Layered)' : 'var(--blur-bg)',
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
    </BlurryBackground>
  );
});
