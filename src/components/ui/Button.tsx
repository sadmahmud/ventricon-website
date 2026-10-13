import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 " +
  "whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(100deg,var(--color-brand-600),var(--color-grape-500))] text-white " +
    "shadow-[0_10px_30px_-14px_rgba(47,116,245,0.9)] hover:shadow-[0_20px_44px_-16px_rgba(124,83,245,0.95)]",
  secondary:
    "bg-white text-ink-950 hover:bg-brand-50 shadow-[0_10px_30px_-16px_rgba(255,255,255,0.45)]",
  outline:
    "border border-brand-300/25 bg-ink-800/50 text-brand-50 hover:border-brand-300/60 hover:bg-ink-750/70",
  ghost: "text-brand-100 hover:bg-white/5 hover:text-white",
  quiet:
    "border border-transparent bg-ink-800/60 text-slate-200 hover:border-brand-300/30 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-5.5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

const iconSizes: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4.5 w-4.5",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: IconName;
  iconPosition?: "start" | "end";
  /** Renders a spinner and blocks interaction. */
  loading?: boolean;
  fullWidth?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with the correct rel attributes. */
  external?: boolean;
  prefetch?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function content({
  children,
  icon,
  iconPosition = "end",
  size,
  loading,
}: Pick<CommonProps, "children" | "icon" | "iconPosition" | "size" | "loading">) {
  const dimension = iconSizes[size ?? "md"];

  return (
    <>
      {loading ? (
        <Icon
          name="loader"
          className={cn(dimension, "animate-spin")}
          title="Loading"
        />
      ) : icon && iconPosition === "start" ? (
        <Icon name={icon} className={dimension} />
      ) : null}

      <span>{children}</span>

      {!loading && icon && iconPosition === "end" ? (
        <Icon
          name={icon}
          className={cn(
            dimension,
            "transition-transform duration-200 group-hover/btn:translate-x-0.5",
          )}
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    iconPosition = "end",
    loading = false,
    fullWidth = false,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content({ children, icon, iconPosition, size, loading })}
          <span className="vc-sr-only">(opens in a new tab)</span>
        </a>
      );
    }

    return (
      <Link
        href={href}
        prefetch={props.prefetch}
        className={classes}
        aria-busy={loading || undefined}
      >
        {content({ children, icon, iconPosition, size, loading })}
      </Link>
    );
  }

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    variant: _v,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    size: _s,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className: _c,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    icon: _i,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    iconPosition: _ip,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: _l,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullWidth: _fw,
    ...buttonProps
  } = props as ButtonAsButton & Record<string, unknown>;

  return (
    <button
      {...(buttonProps as ComponentPropsWithoutRef<"button">)}
      className={classes}
      aria-busy={loading || undefined}
    >
      {content({ children, icon, iconPosition, size, loading })}
    </button>
  );
}
