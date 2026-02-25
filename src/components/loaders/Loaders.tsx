import './Loaders.css';

interface LocationsLoaderProps {
  styles?: React.CSSProperties;
  children: React.ReactNode;
}

export const LocationsLoader = ({styles ={}, children}: LocationsLoaderProps) => {
  return (
    <div className="loader-bar-container" style={styles}>
      <div className="loader-bar"></div>
      { children }
    </div>
  )
};