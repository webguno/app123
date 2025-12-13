import React from 'react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onClick: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onClick }) => {
  return (
    <div 
      className="bg-white overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col h-full"
      onClick={() => onClick(offer)}
    >
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={offer.icon_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.title)}&background=random`} 
            alt={offer.title} 
            className="h-14 w-14 rounded-xl object-cover border border-gray-100 shadow-sm"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{offer.title}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {offer.description}
        </p>
        <button 
          className="w-full mt-auto bg-gray-50 text-indigo-600 font-medium py-2 px-4 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OfferCard;