import { forwardRef } from 'react';
import './BlurryBackground.css';

interface BlurryBackgroundProps extends React.HTMLAttributes<HTMLElement> {
  style?: React.CSSProperties;
  children: React.ReactNode;
  elementTag?: React.ElementType; 
  className?: string;
}

/**
 * Компонент-обертка для создания эффекта "жидкого стекла".
 * Поддерживает динамическую смену HTML-тега и проброс рефа.
 * 
 * @example
 * <BlurryBackground ref={myRef} elementTag="section" className="my-class">
 *   <p>Контент на стеклянном фоне</p>
 * </BlurryBackground>
 * 
 * @param {BlurryBackgroundProps} props - Свойства компонента.
 * @param {React.CSSProperties} [props.style] - Дополнительные инлайновые стили.
 * @param {React.ReactNode} props.children - Вложенные элементы.
 * @param {React.ElementType} [props.elementTag='div'] - HTML-тег или React-компонент, который будет использован как контейнер.
 * @param {string} [props.className] - Дополнительные CSS-классы для стилизации.
 */
export const BlurryBackground = forwardRef<HTMLElement, BlurryBackgroundProps>(
  (
    {
      style = {},
      children,
      elementTag: ElementTag = 'div',
      className = "",
      ...props // Собираем остальные стандартные атрибуты (id, onClick и т.д.)
    },
    ref
  ) => {
    return (
      <ElementTag
        {...props}
        ref={ref}
        className={`bg-Blurry-glass ${className}`}
        style={style}
      >
        {children}
      </ElementTag>
    );
  }
);

BlurryBackground.displayName = 'BlurryBackground';
