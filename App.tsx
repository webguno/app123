import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './services/supabaseClient';
import { User } from '@supabase/supabase-js';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import OfferCard from './components/OfferCard';
import OfferModal from './components/OfferModal';
import { fetchOffers, trackOfferClick, fetchUserTotalClicks } from './services/offerService';
import { Offer } from './types';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Dashboard State
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [loadingOffers, setLoadingOffers] = useState(false);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoadingOffers(true);
    try {
      const [fetchedOffers, count] = await Promise.all([
        fetchOffers(),
        fetchUserTotalClicks(user.id)
      ]);
      setOffers(fetchedOffers);
      setClickCount(count);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoadingOffers(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  const handleCompleteOffer = async (offerId: string) => {
    if (!user) return;
    try {
      await trackOfferClick(offerId, user.id);
      // Update local count optimistically or refetch
      setClickCount(prev => prev + 1);
      // In a real app, maybe show a toast notification here
      console.log('Offer tracked successfully');
    } catch (error) {
      console.error('Failed to track offer', error);
      // Handle error (e.g. toast)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar userEmail={user?.email} clickCount={clickCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Tasks</h1>
          <p className="mt-2 text-gray-600">Select a task to view details and complete it.</p>
        </div>

        {loadingOffers ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow-sm p-6 h-48 animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="h-14 w-14 bg-gray-200 rounded-xl"></div>
                     <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="h-3 bg-gray-200 rounded w-full"></div>
                     <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
           </div>
        ) : (
          <>
            {offers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks available</h3>
                <p className="mt-1 text-sm text-gray-500">Check back later for new offers.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <OfferCard 
                    key={offer.id} 
                    offer={offer} 
                    onClick={handleOfferClick} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <OfferModal 
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleCompleteOffer}
      />
    </div>
  );
};

export default App;