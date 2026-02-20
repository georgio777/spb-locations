import './BlurryBackground.css';

interface BlurryBackgroundProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  elementTag?: React.ElementType; 
  className?: string;
}


/**
 * Компонент-обертка для создания эффекта "жидкого стекла".
 * Поддерживает динамическую смену HTML-тега.
 * 
 * @example
 * <BlurryBackground elementTag="section" className="my-class">
 *   <p>Контент на стеклянном фоне</p>
 * </BlurryBackground>
 * 
 * @param {BlurryBackgroundProps} props - Свойства компонента.
 * @param {React.CSSProperties} [props.style] - Дополнительные инлайновые стили.
 * @param {React.ReactNode} props.children - Вложенные элементы.
 * @param {React.ElementType} [props.elementTag='div'] - HTML-тег или React-компонент, который будет использован как контейнер.
 * @param {string} [props.className] - Дополнительные CSS-классы для стилизации.
 * 
 * @returns {JSX.Element} Отрендеренный компонент с эффектом стекла.
 */
export const BlurryBackground = ({
  style = {}, 
  children, 
  elementTag: ElementTag = 'div', // Переименовываем в CamelCase внутри
  className = ""
}: BlurryBackgroundProps) => {
  return (
    <ElementTag 
      className={`bg-Blurry-glass ${className}`}
      style={style}
    >
      {children}
    </ElementTag>
  );
};
