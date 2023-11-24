import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import type { MouseEventHandler } from "react";
import { ReactComponent as Cross } from "../../assets/mobil/cross.svg";
import { ReactComponent as ArrowDown } from "../../assets/mobil/arrow-down.svg";

import Styles from "./NavRange.module.scss";

type SelectProps = {
  selected: { from: string; before: string };
  placeholder?: string;
  status?: "default" | "invalid";
  onChange?: (selected: { from: string; before: string }) => void;
  onClose?: () => void;
};

const NavRange = (props: SelectProps) => {
  const {
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

  const handleOptionClick = (value: { from: string; before: string }) => {
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };
  const handleCrossClick: MouseEventHandler<HTMLDivElement> = () => {
    onChange?.({ from: "", before: "" });
  };

  return (
    <div
      className={Styles.selectWrapper}
      ref={rootRef}
      data-is-active={isOpen}
      data-selected={selected.from !== "" && selected.before !== ""}
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
        data-selected={selected.from !== "" && selected.before !== ""}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected.from === "" && selected.before === ""
          ? placeholder
          : `${selected.from} - ${selected.before}`}
      </div>
      {isOpen && (
        <div className={Styles.rangeBox}>
          <input
            className={Styles.rangeInp}
            type="text"
            placeholder="from"
            maxLength={4}
            value={selected?.from}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOptionClick({ ...selected, from: e.target.value })
            }
          />
          <div className={Styles.rangeDef}></div>
          <input
            className={Styles.rangeInp}
            type="text"
            placeholder="before"
            maxLength={4}
            value={selected?.before}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOptionClick({
                ...selected,
                before: e.target.value,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default NavRange;
