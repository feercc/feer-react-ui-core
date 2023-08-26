import { ReactNode } from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  /**
   * 是否是主要按钮，主要按钮添加背景颜色
   */
  primary?: boolean;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 大小
   */
  size?: "small" | "medium" | "large";
  /**
   * Button内容
   */
  children?: ReactNode;
  /**
   * 点击事件
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  children,
  ...props
}: ButtonProps) => {
  const mode = primary ? "feer-button--primary" : "feer-button--secondary";
  return (
    <button
      type="button"
      className={`${styles["feer-button"]} ${styles[`feer-button--${size}`]} ${
        styles[mode]
      }`}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
