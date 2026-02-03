export interface Partner {
  bank: string;
  ratio: string;
  time: string;
  bonus?: number;
}

export interface Airline {
  name: string;
  iata: string;
  domain: string;
  alliance: string;
  bookable: string;
  featured?: boolean;
  logo?: string;
  partners: Partner[];
}

export interface Bank {
  id: string;
  name: string;
  domain: string;
  logoOverride?: string;
}