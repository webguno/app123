import { supabase } from './supabaseClient';
import { Offer } from '../types';

export const fetchOffers = async (): Promise<Offer[]> => {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }

  return data || [];
};

export const fetchUserTotalClicks = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('offer_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching click count:', error);
    return 0;
  }

  return count || 0;
};

export const trackOfferClick = async (offerId: string, userId: string): Promise<void> => {
  // Check if user already clicked this recently to prevent spam (optional logic, keeping simple for now)
  const { error } = await supabase
    .from('offer_clicks')
    .insert([
      {
        offer_id: offerId,
        user_id: userId,
        clicked_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error('Error tracking click:', error);
    throw error;
  }
};