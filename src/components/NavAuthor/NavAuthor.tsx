// в этом файле 2 элемента
// насколько я понял вы хотели, что бы я создал общий компонент для NavAuthor and NavLocation, но как передавать в это общий компонент разные типы - пока не разобрался. Думал, возможно, есть обопщения <T> для функциональных компонентов.
import React, { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";

import { ReactComponent as ArrowDown } from "../../assets/mobil/arrow-down.svg";
import { ReactComponent as Cross } from "../../assets/mobil/cross.svg";
import Styles from "./NavAut.module.scss";
import { ServerResponseMin } from "../../models/models";
import { stringLen } from "../../utils/StringLen";

type OptionProps = {
  option: ServerResponseMin;
  onClick: (value: ServerResponseMin) => void;
};
const OptionEl: React.FC<OptionProps> = (props) => {
  const {
    option: { name, id },
    onClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: ServerResponseMin): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const optionE = optionRef.current;
    if (!optionE) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === optionE && event.key === "Enter") {
        onClick({ name, id });
      }
    };

    optionE.addEventListener("keydown", handleEnterKeyDown);
    return () => optionE.removeEventListener("keydown", handleEnterKeyDown);
  }, [id, onClick]);

  return (
    <li
      className={Styles.option}
      value={id}
      onClick={handleClick({ name, id })}
      tabIndex={0}
      ref={optionRef}
    >
      {window.innerWidth > 768 && window.innerWidth < 1024
        ? stringLen(13, name)
        : window.innerWidth > 1024 && window.innerWidth < 1368
        ? stringLen(19, name)
        : name}
    </li>
  );
};
// ===================================================================================
type SelectProps = {
  selected: ServerResponseMin | null;
  options: ServerResponseMin[];
  placeholder?: string;
  status?: "default" | "invalid";
  onChange?: (selected: ServerResponseMin | null) => void;
  onClose?: () => void;
};

const Select: React.FC<SelectProps> = (props) => {
  const {
    options,
    placeholder,
    status = "default",
    selected,
    onChange,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        if (isOpen) onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: ServerResponseMin) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };
  const handleCrossClick: MouseEventHandler<HTMLDivElement> = () => {
    onChange?.(null);
  };

  return (
    <div
      className={Styles.selectWrapper}
      ref={rootRef}
      data-is-active={isOpen}
      data-selected={!!selected?.id}
    >
      <div className={Styles.cross} onClick={handleCrossClick}>
        <Cross className={Styles.crossSvg} />
      </div>
      <div className={Styles.arrow} onClick={handlePlaceHolderClick}>
        <ArrowDown className={Styles.arrowSvg} />
      </div>
      <div
        className={Styles.placeholder}
        data-status={status}
        data-selected={!!selected?.id}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {window.innerWidth > 768 && window.innerWidth < 1024
          ? stringLen(12, selected?.name) || placeholder
          : window.innerWidth > 1024 && window.innerWidth < 1368
          ? stringLen(20, selected?.name) || placeholder
          : stringLen(26, selected?.name) || placeholder}
      </div>
      {isOpen && (
        <ul className={Styles.select}>
          {options.map((option) => (
            <OptionEl
              key={option.id}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
