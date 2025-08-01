const DashboardBtn = ({
  cta,
  onClick = () => {},
  className = "",
  disabled = false,
  loading = false,
  variant = "default",
  icon = null,
}: {
  cta: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "outline" | "yellow";
  icon?: React.ReactNode | null;
}) => {
  const baseClasses = `w-full text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${className} cursor-pointer`;
  const variantClasses =
    variant === "outline"
      ? ` ${
          disabled
            ? "border-2 border-gray-300 text-gray-500 cursor-not-allowed"
            : "border-2 border-[#004F71] bg-white text-gray-700 hover:shadow-md hover:shadow-teal-900/25"
        }  `
      : variant === "yellow"
      ? ` ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#dbb004] hover:bg-[#e0b403]/80 transition-background duration-300 text-white shadow-md hover:shadow-lg "
        }  `
      : ` ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#004F71] hover:bg-[#00425F] transition-background duration-300 text-white shadow-md hover:shadow-lg "
        }  `;

  return (
    <button
      className={` ${variantClasses} ${baseClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {loading && (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
      )}
      {cta}
    </button>
  );
};

export default DashboardBtn;
