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
      
      // ПРОВЕРКА: игнорируем клики по disabled элементам
      const targetElement = target as HTMLElement;
      if (targetElement.hasAttribute?.('disabled') || 
          (targetElement.closest?.('[disabled]'))) {
        return;
      }

      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
