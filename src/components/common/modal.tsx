// components/Modal.tsx
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative h-[90vh] w-[95vw] overflow-hidden rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-gray-700 hover:text-red-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
