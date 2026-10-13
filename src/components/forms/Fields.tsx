import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ shared */

export type FieldMeta = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

const controlBase =
  "w-full rounded-xl border bg-ink-900/80 px-4 py-3 text-[0.9375rem] text-slate-100 " +
  "placeholder:text-slate-500 transition-colors duration-200 outline-none " +
  "focus:border-brand-400/70 focus:bg-ink-850 focus:ring-2 focus:ring-brand-500/25 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const controlIdle = "border-white/10 hover:border-white/18";
const controlError =
  "border-[#ff6b6b]/55 focus:border-[#ff6b6b]/80 focus:ring-[#ff6b6b]/20";

function describedBy(meta: FieldMeta): string | undefined {
  const ids: string[] = [];
  if (meta.error) ids.push(`${meta.id}-error`);
  if (meta.hint) ids.push(`${meta.id}-hint`);
  return ids.length ? ids.join(" ") : undefined;
}

/**
 * Label + control + hint + error, wired together with the right ARIA
 * relationships. Every control below renders through this shell, so a field can
 * never ship without an accessible name.
 */
export function FieldShell({
  meta,
  children,
  footer,
  className,
}: {
  meta: FieldMeta;
  children: ReactNode;
  /** Extra content rendered under the control (counters, notes). */
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={meta.id}
        className="flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-wide text-slate-300"
      >
        {meta.label}
        {meta.required ? (
          <span className="text-[#ff8f8f]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-[0.6875rem] font-normal text-slate-500">
            (optional)
          </span>
        )}
        {meta.required ? <span className="vc-sr-only">(required)</span> : null}
      </label>

      {children}

      {meta.hint && !meta.error ? (
        <p id={`${meta.id}-hint`} className="text-xs leading-relaxed text-slate-500">
          {meta.hint}
        </p>
      ) : null}

      {meta.error ? (
        <p
          id={`${meta.id}-error`}
          className="flex items-start gap-1.5 text-xs leading-relaxed text-[#ff9d9d]"
        >
          <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{meta.error}</span>
        </p>
      ) : null}

      {footer}
    </div>
  );
}

/* ------------------------------------------------------------------ inputs */

export function TextInput({
  meta,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  disabled,
  className,
}: {
  meta: FieldMeta;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <FieldShell meta={meta}>
      <input
        id={meta.id}
        name={meta.id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        disabled={disabled}
        required={meta.required}
        aria-required={meta.required || undefined}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={describedBy(meta)}
        className={cn(
          controlBase,
          meta.error ? controlError : controlIdle,
          className,
        )}
      />
    </FieldShell>
  );
}

export function TextArea({
  meta,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 5,
  maxLength,
  disabled,
  footer,
  className,
}: {
  meta: FieldMeta;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <FieldShell meta={meta} footer={footer}>
      <textarea
        id={meta.id}
        name={meta.id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        required={meta.required}
        aria-required={meta.required || undefined}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={describedBy(meta)}
        className={cn(
          controlBase,
          "resize-y leading-relaxed",
          meta.error ? controlError : controlIdle,
          className,
        )}
      />
    </FieldShell>
  );
}

export function SelectField({
  meta,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  disabled,
  footer,
  className,
}: {
  meta: FieldMeta;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <FieldShell meta={meta} footer={footer}>
      <div className="relative">
        <select
          id={meta.id}
          name={meta.id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          required={meta.required}
          aria-required={meta.required || undefined}
          aria-invalid={meta.error ? true : undefined}
          aria-describedby={describedBy(meta)}
          className={cn(
            controlBase,
            "appearance-none pr-11",
            value ? "text-slate-100" : "text-slate-500",
            meta.error ? controlError : controlIdle,
            className,
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-slate-100"
            >
              {option.label}
            </option>
          ))}
        </select>

        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
      </div>
    </FieldShell>
  );
}

export function CheckboxField({
  meta,
  checked,
  onChange,
  children,
  className,
}: {
  meta: FieldMeta;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          id={meta.id}
          name={meta.id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={meta.error ? true : undefined}
          aria-describedby={meta.error ? `${meta.id}-error` : undefined}
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border bg-ink-900 transition-colors",
            "checked:border-brand-400 checked:bg-brand-500",
            "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m4.5 12.5 4.5 4.5L19.5 6.5%22/></svg>')] checked:bg-center checked:bg-no-repeat",
            meta.error ? controlError : "border-white/18 hover:border-white/30",
          )}
        />
        <label
          htmlFor={meta.id}
          className="cursor-pointer text-[0.8125rem] leading-relaxed text-slate-400"
        >
          {children}
        </label>
      </div>

      {meta.error ? (
        <p
          id={`${meta.id}-error`}
          className="flex items-start gap-1.5 text-xs text-[#ff9d9d]"
        >
          <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{meta.error}</span>
        </p>
      ) : null}
    </div>
  );
}
