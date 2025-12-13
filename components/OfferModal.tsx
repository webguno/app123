import React, { useState } from 'react';
import { Offer } from '../types';

interface OfferModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (offerId: string) => Promise<void>;
}

const OfferModal: React.FC<OfferModalProps> = ({ offer, isOpen, onClose, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !offer) return null;

  const handleComplete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If no valid link, prevent default behavior
    if (!offer.link) {
      e.preventDefault();
      alert("This offer does not have a valid link.");
      return;
    }

    // We let the default behavior (opening link) happen.
    // We track the click in the background.
    setIsSubmitting(true);
    
    // Fire and forget the tracking call, or handle errors silently so navigation isn't blocked
    onComplete(offer.id)
      .catch((err) => console.error("Failed to track offer click", err))
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          
          {/* Header */}
          <div className="bg-gray-50 px-4 py-5 sm:px-6 flex items-start justify-between">
             <div className="flex items-center gap-3">
                <img 
                  src={offer.icon_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.title)}&background=random`} 
                  alt={offer.title} 
                  className="h-10 w-10 rounded-lg shadow-sm"
                />
                <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                  {offer.title}
                </h3>
             </div>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:p-6 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-gray-600 mb-6">{offer.description}</p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Steps to Complete</h4>
              <ul className="space-y-3">
                {offer.steps && offer.steps.length > 0 ? (
                  offer.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{step}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">No specific steps provided.</li>
                )}
              </ul>
            </div>

            {offer.terms && offer.terms.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <h4 className="text-xs font-semibold text-yellow-800 uppercase tracking-wide mb-2">Terms & Conditions</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {offer.terms.map((term, index) => (
                    <li key={index} className="text-xs text-yellow-700">{term}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <a
              href={offer.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleComplete}
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm transition-colors decoration-0 ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } ${!offer.link ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : 'Complete Offer'}
            </a>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;