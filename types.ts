export interface Offer {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  steps: string[];
  terms: string[];
  is_active: boolean;
  created_at: string;
}

export interface OfferClick {
  id: string;
  user_id: string;
  offer_id: string;
  clicked_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
}

export interface AuthError {
  message: string;
}