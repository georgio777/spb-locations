import './MainLoader.css';
import loaderSvg from '../../assets/MainLoader.svg';

const MainLoader = () => {
  return (
    <div className='loader-wrapper'>
      <h1>Литературные локации</h1>
      <div className="loader">
        <img className='loader__img' src={loaderSvg} alt="" />
      </div>
      <p>Загрузка...</p>
    </div>
  );
};

export default MainLoader;