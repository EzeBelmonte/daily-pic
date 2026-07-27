import {
  type TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
} from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      maxLength,
      value,
      className = "",
      autoResize = true,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const textareaRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>;

    const length =
      typeof value === "string" ? value.length : 0;

    const resize = () => {
      const textarea = internalRef.current;

      if (!textarea || !autoResize) return;

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
      resize();
    }, [value]);

    const handleChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      resize();
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="font-medium text-sm text-gray-700">
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          className={`
            min-h-[40px]
            rounded
            border
            border-gray-300/20
            px-2
            py-1
            text-sm
            text-white
            overflow-hidden
            resize-none
            outline-none
            transition
            focus:border-blue-500
            focus:ring-0
            disabled:bg-gray-100
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        <div className="flex justify-between text-xs">
          <span className={error ? "text-red-500" : "text-gray-500"}>
            {error ?? helperText}
          </span>

          {maxLength && (
            <span className="text-gray-400">
              {length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;