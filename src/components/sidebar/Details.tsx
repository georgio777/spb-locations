import { Fragment, useEffect, useRef } from 'react'; // Используем стандартный React Fragment
import type { CharacterDescriptions } from '../../types/locations.types';
import './Details.css';
import { Divider } from './Divider';
import { useParams } from 'react-router';

export const Details = ({ details }: { details: CharacterDescriptions }) => {
  const { id } = useParams();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Сбрасываем скролл контейнера при изменении id
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo(0, 0);
    }
  }, [id]);
  return (
    <main ref={wrapperRef} className="sidebar-details-container">
      {details.map((description, index) => (
        <Fragment key={description.id}>
          <div className="sidebar-details">
            <h2 className="sidebar-details__heading">{description.heading}</h2>
            
            {/* 1. Сначала делим весь текст на части по разделителю ``` */}
            {description.info.split(/```/g).map((part, partIndex) => {
              // Каждая нечетная часть (1, 3, 5...) — это стихи
              const isPoetry = partIndex % 2 === 1;

              if (isPoetry) {
                return (
                  <p key={`poetry-${partIndex}`} className="sidebar-details__poetry">
                    {part.trim().split('\r\n').map((line, lineIndex, array) => (
                      <Fragment key={lineIndex}>
                        {line}
                        {lineIndex < array.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </p>
                );
              }

              // 2. Обычный текст: делим по \r\n и создаем стандартные параграфы
              return part
                .split('\r\n')
                .filter((p) => p.trim() !== '') // Игнорируем пустые строки
                .map((p, pIndex) => (
                  <p key={`paragraph-${partIndex}-${pIndex}`} className="sidebar-details__paragraph">
                    {p}
                  </p>
                ));
            })}
          </div>
          {index < details.length - 1 && <Divider />}
        </Fragment>
      ))}
    </main>
  );
};
