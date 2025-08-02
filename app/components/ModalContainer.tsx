import { X } from "lucide-react";

const ModalContainer = ({
  handleClose,
  children,
  Icon,
  heading,
  text,
  scroll = false,
  momo = false,
  backdrop = "bg-black/60 backdrop-blur-sm",
  className = "",
}: {
  handleClose: () => void;
  children: React.ReactNode;
  Icon: React.ReactNode;
  heading: string;
  text: string;
  scroll?: boolean;
  momo?: boolean;
  backdrop?: string;
  className?: string;
}) => {
  return (
    <div
      className={`fixed inset-0 ${backdrop} flex items-center justify-center z-50 p-4`}
    >
      <div
        className={`rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden transform transition-all ${
          scroll ? "max-h-[90vh] overflow-y-auto" : ""
        } ${className}`}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#003057] to-[#005377] px-6 py-4 relative">
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full bg-white/10"
            onClick={handleClose}
          >
            <X size={20} />
          </button>

          <div className="flex items-center space-x-2">
            <div className="bg-[#FFCC00] p-2 rounded-lg">{Icon}</div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {momo && (
                  <span className="text-[#FFCC00] text-shadow-2xs">
                    MoMoPSB
                  </span>
                )}{" "}
                {heading}
              </h2>
              <p className="text-blue-100 text-sm">{text}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:p-12 p-6 bg-white ">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
