import React from "react";
import cn from "@common/classnames";
import { Icon, type IconNamesT, Loader } from "../index";
import styles from "./Button.module.css";

interface Props {
  appearance?: "button" | "none" | "light";
  icon?: IconNamesT;
  iconRight?: boolean;
  full?: boolean;
  children?: JSX.Element | Array<JSX.Element> | string;
  useAnchor?: boolean;
  className?: string;
  size?: "medium" | "small" | "xsmall" | "large";
  loading?: boolean;
  disabled?: boolean;
  progress?: number;
  noPadding?: boolean;
  color?: "black" | "red";
  [key: string]: any;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      appearance = "button",
      icon = null,
      iconRight = false,
      full = false,
      children = null,
      useAnchor = false,
      className = "",
      size = "medium",
      loading = false,
      disabled = false,
      progress = 0,
      noPadding = false,
      color = "black",
      ...props
    },
    ref
  ) =>
    React.createElement(
      useAnchor ? "a" : "button",
      {
        className: cn(className, styles.root, {
          [styles.appearanceButton]: appearance === "button",
          [styles.appearanceNone]: appearance === "none",
          [styles.appearanceLight]: appearance === "light",
          [styles.appearanceNone]: appearance === "none",
          [styles.isSquare]: !Boolean(children) && Boolean(icon),
          [styles.iconRight]: iconRight,
          [styles.hasContent]: Boolean(children),
          [styles[`size-${size}`]]: size !== "medium",
          [styles[`color-${color}`]]: color !== "black",
          [styles.isLoading]: loading,
          [styles.isDisabled]: disabled,
          [styles.hasNoPadding]: noPadding,
          [styles.fullWidth]: full,
        }),
        disabled,
        ref,
        ...props,
      },
      <React.Fragment>
        <Loader className={styles.loader} />
        {icon && <Icon icon={icon} className={styles.icon} />}
        <span className={cn(styles.content)}>{children}</span>
        <span
          className={cn(styles.progress)}
          style={{ width: `${progress}%` }}
        />
      </React.Fragment>
    )
);

export default Button;
