// в этом файле 2 элемента
import React, { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";

import { ReactComponent as ArrowDown } from "../../assets/mobil/arrow-down.svg";
import { ReactComponent as Cross } from "../../assets/mobil/cross.svg";
import Styles from "../NavAuthor/NavAut.module.scss";
import { ServerResponseLoc } from "../../models/models";
import { stringLen } from "../../utils/StringLen";

type OptionProps = {
  option: ServerResponseLoc;
  onClick: (value: ServerResponseLoc) => void;
};
const OptionEl = (props: OptionProps) => {
  const {
    option: { location, id },
    onClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: ServerResponseLoc): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const optionE = optionRef.current;
    if (!optionE) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === optionE && event.key === "Enter") {
        onClick({ location, id });
      }
    };

    optionE.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      optionE.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [id, onClick]);

  return (
    <li
      className={Styles.option}
      value={id}
      onClick={handleClick({ location, id })}
      tabIndex={0}
      ref={optionRef}
    >
      {window.innerWidth > 768 && window.innerWidth < 1024
        ? stringLen(12, location)
        : window.innerWidth > 1024 && window.innerWidth < 1368
        ? stringLen(19, location)
        : location}
    </li>
  );
};
// ===================================================================================
type SelectProps = {
  selected: ServerResponseLoc | null;
  options: ServerResponseLoc[];
  placeholder?: string;
  status?: "default" | "invalid";
  onChange?: (selected: ServerResponseLoc | null) => void;
  onClose?: () => void;
};

const Select = (props: SelectProps) => {
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

  const handleOptionClick = (value: ServerResponseLoc) => {
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
          ? stringLen(12, selected?.location) || placeholder
          : window.innerWidth > 1024 && window.innerWidth < 1368
          ? stringLen(19, selected?.location) || placeholder
          : stringLen(26, selected?.location) || placeholder}
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
