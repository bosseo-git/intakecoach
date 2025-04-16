import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * InputDesign - A responsive, modern, and colorful input component
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the input
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.label - Label text for the input
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Current input value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.icon - Optional icon component to display inside input
 * @param {Object} props.inputProps - Additional props to pass to the input element
 */
const InputDesign = ({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  icon,
  inputProps = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setHasValue(!!value);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    setHasValue(!!e.target.value);
  };

  // Animation variants for label
  const labelVariants = {
    default: {
      y: 0,
      scale: 1,
      color: "#64748b", // gray-500
    },
    active: {
      y: -24,
      scale: 0.85,
      color: "#2563eb", // primary-600
    },
    error: {
      y: -24,
      scale: 0.85,
      color: "#ef4444", // red-500
    },
  };

  // Determine which variant to use
  const labelVariant = error
    ? "error"
    : isFocused || hasValue
      ? "active"
      : "default";

  return (
    <div className={`relative mb-5 ${className}`}>
      <div className="relative">
        {/* Colorful gradient border effect when focused */}
        {isFocused && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary-400 via-purple-500 to-primary-600 opacity-75 blur-sm"
          />
        )}

        {label && (
          <motion.label
            htmlFor={id}
            initial={hasValue ? "active" : "default"}
            animate={labelVariant}
            variants={labelVariants}
            transition={{ duration: 0.2 }}
            className="absolute left-3 cursor-text origin-left z-10 px-1 bg-white"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}

        <div className="relative flex items-center">
          {icon && <div className="absolute left-3 text-gray-400">{icon}</div>}

          <input
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? placeholder : ""}
            required={required}
            className={`
              w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                  : "border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
              }
              ${isFocused || hasValue ? "pt-6 pb-2" : "py-4"}
              shadow-sm
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...inputProps}
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-2 flex items-start"
        >
          <div className="flex-shrink-0 mr-2">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        </motion.div>
      )}

      {/* Character count for text inputs */}
      {(type === "text" || type === "textarea") &&
        inputProps.maxLength &&
        value && (
          <div className="absolute right-3 bottom-1 text-xs text-gray-400">
            {value.length}/{inputProps.maxLength}
          </div>
        )}
    </div>
  );
};

/**
 * Example usage:
 *
 * <InputDesign
 *   id="email"
 *   type="email"
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   required
 *   icon={<FiMail size={18} />}
 *   error={emailError}
 * />
 */

export default InputDesign;
