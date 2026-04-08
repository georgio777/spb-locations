import { useUtilStore } from "../../store/useUtilStore";

interface OpenSearchProps {
  children: (props: { open: () => void; activePanel: boolean; }) => React.ReactNode;
}

export const OpenSearch = ({ children }: OpenSearchProps) => {
  const setActivePanel = useUtilStore(state => state.setActivePanel);
  const activePanel = useUtilStore(state => state.activePanel);

  const handleOpen = () => {
    setActivePanel('search')
  };

  return <>{children({ open: handleOpen, activePanel: activePanel === 'search' })}</>;
};
