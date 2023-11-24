import React, { ChangeEvent } from "react";

import Styles from "./NavName.module.scss";

type SelectProps = {
  selected: string;
  status?: "default" | "invalid";
  onChange?: (selected: string) => void;
};

const NavName = (props: SelectProps) => {
  const { status = "default", selected, onChange } = props;

  const handleOptionClick = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className={Styles.selectWrapper} data-selected={selected !== ""}>
      <div
        className={Styles.placeholder}
        data-status={status}
        data-selected={selected !== ""}
        role="button"
        tabIndex={0}
      >
        <input
          type="text"
          className={Styles.input}
          value={selected}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOptionClick(e.target.value)
          }
          placeholder="name"
        />
      </div>
    </div>
  );
};

export default NavName;
