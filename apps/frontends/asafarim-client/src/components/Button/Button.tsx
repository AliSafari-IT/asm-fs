// src/components/Button/Button.tsx
import { PropsWithChildren, ReactElement } from "react";
import cx from "../../utils/concatenateClasses";

const styles = {
  base: "rounded",
  variants: {
    default: "bg-gray-600",
    primary: "bg-blue-600",
    secondary: "bg-green-600",
  },
  sizes: {
    sm: "px-1 py-1",
    md: "px-2 py-1",
    lg: "px-3 py-1",
  },
};

type Variant = keyof typeof styles.variants;

type Size = keyof typeof styles.sizes;

type Props = {
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
};

function Button({
  type = "button",
  variant = "default",
  size = "md",
  disabled = false,
  children,
}: PropsWithChildren<Props>): ReactElement {
  const classes = cx(
    styles.base,
    !disabled && styles.variants[variant],
    styles.sizes[size],
    disabled && "bg-gray-800"
  );

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;