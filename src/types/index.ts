export type MenuCategory = 'all' | 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  description: string;
  price: number;
  highlight?: string;
  pairing?: string;
  dietary?: string[];
  calories?: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  experience: 'tasting-menu' | 'chef-counter' | 'main-dining' | 'private-salon';
  notes?: string;
}
