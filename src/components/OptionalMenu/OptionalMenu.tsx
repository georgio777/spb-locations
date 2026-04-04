import { AnimatePresence, motion } from "framer-motion";
import { BlurryBackground } from "../data-containers/BlurryBackground";
import { useFilteredStore } from "../../store/useFilteredStore";
import './OptionalMenu.css'

const containerVariants = {
  open: {
    opacity: 1,
    scaleX: 1,
    x: 0,
    transition: { when: "beforeChildren"}
  },
  closed: {
    opacity: 0,
    scaleX: 0,
    x: -10,
    transition: { when: "afterChildren"}
  }
}

export const OptionalMenu = () => {
  const filteredData = useFilteredStore(state => state.filteredData);
  const clearFiltered = useFilteredStore(state => state.clearFilteredData);
  
  const onClick = () => {
    clearFiltered();
  };

  const showMenu = !!filteredData;

  return (
    <AnimatePresence>
      { showMenu && 
      <motion.menu 
      className="optional-menu__wrapper">
        <motion.button       
          variants={containerVariants} 
          initial="closed"
          animate="open"
          exit="closed" 
          whileHover={{scale: 1.02}} 
          className="optional-menu__button" 
          onClick={onClick}>
          <BlurryBackground className="optional-menu-button__inner">
            Вернуть все локации
          </BlurryBackground>
        </motion.button>
      </motion.menu>
      }
    </AnimatePresence>
  );
};
