import { useUtilStore } from "../../../store/useUtilStore";

interface OpenSearchProps {
  children: (props: { open: () => void; }) => React.ReactNode;
}

export const OpenSearch = ({ children }: OpenSearchProps) => {
  const setActivePanel = useUtilStore(state => state.setActivePanel)

  const handleOpen = () => {
    setActivePanel('search')
  };

  return <>{children({ open: handleOpen })}</>;
};
