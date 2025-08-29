import React from 'react';

const Modals = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionButton = false,
  actionBtnIcon = null,
  actionBtnText = '',
  onActionClick = () => {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"> {/*inset-0 : Centers an element both horizontally and vertically within its containing element. .*/ }
      <div className="relative bg-white shadow-lg rounded-lg md:w-md w-sm  mx-auto p-6">
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="md:text-lg font-bold text-gray-900">{title}</h3>
            {showActionButton && (
              <button
                onClick={onActionClick}
                className="btn-small-light mr-12"
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-1 right-1"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="max-h-[80vh] flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modals;
