import { useSearchStore } from "../../../store/useSearchStore";

interface OpenSearchProps {
  children: (props: { open: () => void; isOpen: boolean }) => React.ReactNode;
}

export const OpenSearch = ({ children }: OpenSearchProps) => {
  const isOpen = useSearchStore(state => state.isOpen);
  const setOpen = useSearchStore(state => state.setOpen);

  const handleOpen = () => {
    if (!isOpen) {
      setOpen();
    }
  };

  return <>{children({ open: handleOpen, isOpen })}</>;
};
