import { useEffect, type RefObject } from 'react';

/**
 * @param ref — ссылка на элемент, клики ВНЕ которого мы отслеживаем
 * @param callback — функция, которая выполнится при клике снаружи
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Если реф пустой или клик был внутри элемента — ничего не делаем
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      callback();
    };

    // Добавляем слушатели для мыши и тач-падов (мобилки)
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
};
