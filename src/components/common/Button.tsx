import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "terminal";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkProps = BaseProps & {
  href: string;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type Props = LinkProps | NativeButtonProps;

function getVariantClass(variant: ButtonVariant) {
  switch (variant) {
    case "primary":
      return "border border-[rgba(34,197,94,0.28)] bg-[rgba(34,197,94,0.10)] text-[var(--color-text)] hover:bg-[rgba(34,197,94,0.14)] hover:border-[rgba(34,197,94,0.38)]";
    case "secondary":
      return "border border-white/10 bg-white/[0.03] text-[var(--color-text)] hover:bg-white/[0.06] hover:border-white/15";
    case "terminal":
      return "border border-white/10 bg-white/[0.02] font-mono text-[var(--color-text)] hover:border-[rgba(34,197,94,0.26)] hover:bg-[rgba(34,197,94,0.05)]";
    default:
      return "";
  }
}

export default function Button(props: Props) {
  const { children, className = "", variant = "primary" } = props;

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200";
  const variantClass = getVariantClass(variant);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {variant === "terminal" && (
          <span className="text-[var(--color-accent)]">$</span>
        )}
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {variant === "terminal" && (
        <span className="text-[var(--color-accent)]">$</span>
      )}
      {children}
    </button>
  );
}