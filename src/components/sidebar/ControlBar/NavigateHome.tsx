import { useNavigate } from "react-router";
import { useFilteredStore } from "../../../store/useFilteredStore";

interface NavigateHomeProps {
  children: (props: { onStartPage: () => void; }) => React.ReactNode;
}

export const NavigateHome = ({ children }: NavigateHomeProps) => {
  const clearFiltered = useFilteredStore(state => state.clearFilteredData);
  const navigate = useNavigate();

  const onStartPage = () => {
    navigate('/');
    clearFiltered();
  };
  
  return <>{children({ onStartPage })}</>;
};
