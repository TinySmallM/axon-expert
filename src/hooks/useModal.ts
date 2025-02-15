import { useCallback, useState } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpen] = useState(false);

  // Выступает параметром как строка когда требуется от чего-то зависеть. 
  // Например когда удаляем элемент - передаем id
  const [param, setParam] = useState<string | null>(null)

  const openModal = useCallback((param?: string) => {
    setIsOpen(true)

    if (param) {
      setParam(param)
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setParam(null)
  }, []);

  return {
    isOpenModal,
    param,
    openModal,
    closeModal,
  };
}