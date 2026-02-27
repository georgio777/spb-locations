import './MainLoader.css';
import loaderSvg from '../../assets/MainLoader.svg';

const MainLoader = () => {
  return (
    <div className='loader-wrapper'>
      <div className="loader">
        <img className='loader__img' src={loaderSvg} alt="" />
      </div>
    </div>
  );
};

export default MainLoader;