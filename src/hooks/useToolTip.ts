import { useCallback, useState } from "react";

export const useToolTip = () => {
  const [isOpenToolTip, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  //Если мы используем ToolTip внутри цикла - как способ индификации.
  const [toolTipId, setToolTipId] = useState<number | string>(0);

  const openToolTip = useCallback((title: string) => {
    setIsOpen(true)
    setTitle(title)
  }, []);

  const closeToolTip = useCallback(() => {
    setIsOpen(false)
    setTitle(null)
    setToolTipId(0)
  }, []);

  return {
    title,
    isOpenToolTip,
    toolTipId,
    openToolTip,
    closeToolTip,
    setToolTipId,
  };
}