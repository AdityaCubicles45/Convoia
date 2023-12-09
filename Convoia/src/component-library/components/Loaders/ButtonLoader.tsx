import { classNames } from "../../../helpers";
import styles from "./Loaders.module.css";

interface ButtonLoaderProps {
  color?: "primary" | "secondary";
  size?: "small" | "large";
}

export const ButtonLoader = ({
  size,
  color = "primary",
}: ButtonLoaderProps) => (

  <div className="flex flex-row">
    <div
      className={classNames(
        "rounded-full",
        styles.btnLoader,
        color === "primary" ? styles.btnLoaderLight : styles.btnLoaderDark,
        size === "small" ? styles.btnLoaderXs : styles.btnLoaderSm,
        styles.animateSpin,
      )}
    />
  </div>
);