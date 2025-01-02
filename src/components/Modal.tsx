import React from 'react';

    interface ModalProps {
      isOpen: boolean;
      onClose: () => void;
      children: React.ReactNode;
    }

    const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      );
    };

    export default Modal;
