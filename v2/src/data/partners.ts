export interface TransferPartner {
  bank: string;
  ratio: string;
  time: string;
  bonus?: number;
}

export interface Airline {
  name: string;
  award: string;
  iata: string;
  domain: string;
  alliance: 'Star Alliance' | 'SkyTeam' | 'Oneworld' | 'No Alliance' | 'Hotels';
  bookable: string;
  featured: boolean;
  partners: TransferPartner[];
}

export const AIRLINES: Airline[] = [
  {
    "name": "Air Canada",
    "award": "Aeroplan",
    "iata": "AC",
    "domain": "aircanada.com",
    "alliance": "Star Alliance",
    "bookable": "CX, EI, EK, EY, G3, VA",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Air France-KLM",
    "award": "Flying Blue",
    "iata": "AF | KL",
    "domain": "airfrance.com",
    "alliance": "SkyTeam",
    "bookable": "AZ, CM, EY, G3, JL, WS, VS",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Alaska | Hawaiian Airlines",
    "award": "Atmos",
    "iata": "AS | HA",
    "domain": "alaskaair.com",
    "alliance": "Oneworld",
    "bookable": "DE, EI, HU, JX, KE, LA, LY, SQ",
    "featured": false,
    "partners": [
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "American Airlines",
    "award": "AAdvantage",
    "iata": "AA",
    "domain": "aa.com",
    "alliance": "Oneworld",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Avianca",
    "award": "LifeMiles",
    "iata": "AV",
    "domain": "lifemiles.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant", "bonus": 15 },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "British Airways",
    "award": "Executive Club",
    "iata": "BA",
    "domain": "britishairways.com",
    "alliance": "Oneworld",
    "bookable": "LA, LY",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Japan Airlines",
    "award": "JAL Mileage Bank",
    "iata": "JL",
    "domain": "jal.co.jp/ar/en/",
    "alliance": "Oneworld",
    "bookable": "AF",
    "featured": true,
    "partners": [
      { "bank": "capitalone", "ratio": "1:0.75", "time": "Instant", "bonus": 30 },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Cathay Pacific",
    "award": "Asia Miles",
    "iata": "CX",
    "domain": "cathaypacific.com",
    "alliance": "Oneworld",
    "bookable": "LA",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "24 hrs" },
      { "bank": "citi", "ratio": "1:1", "time": "24 hrs" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Delta Air Lines",
    "award": "SkyMiles",
    "iata": "DL",
    "domain": "delta.com",
    "alliance": "SkyTeam",
    "bookable": "AZ, HA, LA, LY",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Emirates",
    "award": "SkyAwards",
    "iata": "EK",
    "domain": "emirates.com",
    "alliance": "No Alliance",
    "bookable": "A3, DE, JL, UA",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:0.8", "time": "Instant" },
      { "bank": "citi", "ratio": "1:0.8", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Etihad Airways",
    "award": "Guest",
    "iata": "EY",
    "domain": "etihad.com",
    "alliance": "No Alliance",
    "bookable": "AA, AC, B6, EL, OZ",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Frontier",
    "award": "Miles",
    "iata": "F9",
    "domain": "flyfrontier.com",
    "alliance": "No Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "China Southern",
    "award": "Miles",
    "iata": "F9",
    "domain": "https://www.csair.com/us/EN/index.shtml",
    "alliance": "No Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Hainan Airlines",
    "award": "Miles",
    "iata": "HU",
    "domain": "hainanairlines.com/AT/US/Home",
    "alliance": "No Alliance",
    "bookable": "",
    "featured": true,
    "partners": [
      { "bank": "rove", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "LATAM Airlines",
    "award": "Pass",
    "iata": "LA",
    "domain": "latamairlines.com",
    "alliance": "No Alliance",
    "bookable": "DL",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Virgin Australia Airlines",
    "award": "Velocity FrequentFlyer",
    "iata": "LA",
    "domain": "virginaustralia.com",
    "alliance": "No Alliance",
    "bookable": "AC, AS, EY, HA, NH, QR, SQ, VS, UA",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Iberia",
    "award": "Plus",
    "iata": "IB",
    "domain": "iberia.com",
    "alliance": "Oneworld",
    "bookable": "LA, LY",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }

    ]
  },
  {
    "name": "JetBlue",
    "award": "TrueBlue",
    "iata": "B6",
    "domain": "jetblue.com",
    "alliance": "No Alliance",
    "bookable": "HA, EI",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "amex", "ratio": "1:0.8", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:0.6", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Qantas Airways",
    "award": "FrequentFlyer",
    "iata": "QF",
    "domain": "qantas.com",
    "alliance": "Oneworld",
    "bookable": "CI, EK, LA, LY",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Qatar Airways",
    "award": "Privilege Club",
    "iata": "QR",
    "domain": "qatarairways.com",
    "alliance": "Oneworld",
    "bookable": "B6, LY",
    "featured": false,
    "partners": [
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Finnair",
    "award": "Plus",
    "iata": "AY",
    "domain": "finnair.com",
    "alliance": "Oneworld",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "rove", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Singapore Airlines",
    "award": "KrisFlyer",
    "iata": "SQ",
    "domain": "singaporeair.com",
    "alliance": "Star Alliance",
    "bookable": "AS",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "12-24 hrs" },
      { "bank": "chase", "ratio": "1:1", "time": "12-24 hrs" },
      { "bank": "citi", "ratio": "1:1", "time": "24 hrs" },
      { "bank": "capitalone", "ratio": "1:1", "time": "24 hrs" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Southwest Airlines",
    "award": "Rapid Rewards",
    "iata": "WN",
    "domain": "southwest.com",
    "alliance": "No Alliance",
    "bookable": "CI, FI",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Aer Lingus",
    "award": "AerClub",
    "iata": "EI",
    "domain": "aerlingus.com",
    "alliance": "No Alliance",
    "bookable": "AA, AC, AS, BA, B6, EY, IB, UA",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:1", "time": "Instant" },
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Vueling Airlines",
    "award": "Miles",
    "iata": "VY",
    "domain": "vueling.com",
    "alliance": "No Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "avios", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Turkish Airlines",
    "award": "Miles&Smiles",
    "iata": "TK",
    "domain": "turkishairlines.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "citi", "ratio": "1:1", "time": "1-2 days" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "rove", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "United Airlines",
    "award": "MileagePlus",
    "iata": "UA",
    "domain": "united.com",
    "alliance": "Star Alliance",
    "bookable": "E1, EK, VA",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Air China Airlines",
    "award": "PhoenixMiles",
    "iata": "CA",
    "domain": "airchina.us/US/GB/Home",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Air India",
    "award": "Maharaja Club",
    "iata": "ai",
    "domain": "airindia.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "rove", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Air New Zealand",
    "award": "AirPoints",
    "iata": "NZ",
    "domain": "airnewzealand.com",
    "alliance": "Star Alliance",
    "bookable": "VS",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "200:1", "time": "Instant" }
    ]
  },
  {
    "name": "Asiana Airlines",
    "award": "Asiana Club",
    "iata": "OZ",
    "domain": "flyasiana.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "200:1", "time": "Instant" }
    ]
  },
  {
    "name": "Copa Airlines",
    "award": "ConnectMiles",
    "iata": "CM",
    "domain": "copaair.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "EVA Air",
    "award": "Infinity MileageLands",
    "iata": "BR",
    "domain": "https://www.evaair.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:0.75", "time": "Instant" }
    ]
  },
  {
    "name": "Lufthansa",
    "award": "Miles&More",
    "iata": "LH",
    "domain": "lufthansa.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "rove", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "All Nippon Airways",
    "award": "ANA Mileage Club",
    "iata": "NH",
    "domain": "ana.co.jp/en/us",
    "alliance": "Star Alliance",
    "bookable": "VS",
    "featured": true,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "12-24 hrs" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Aegean Airlines",
    "award": "Miles Bonus",
    "iata": "A3",
    "domain": "aegeanair.com",
    "alliance": "Star Alliance",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "TAP Air Portugal",
    "award": "Miles&Go",
    "iata": "TP",
    "domain": "flytap.com",
    "alliance": "Star Alliance",
    "bookable": "B6",
    "featured": false,
    "partners": [
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Thai Airways",
    "award": "Royal Orchid Plus",
    "iata": "TG",
    "domain": "thaiairways.com",
    "alliance": "Star Alliance",
    "bookable": "B6",
    "featured": false,
    "partners": [
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "rove", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Vietnam Airlines",
    "award": "LotusMiles",
    "iata": "VN",
    "domain": "VietnamAirlines.com",
    "alliance": "SkyTeam",
    "bookable": "AF, DL, NH",
    "featured": true,
    "partners": [
      { "bank": "rove", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Saudia Airlines",
    "award": "Al Fursan",
    "iata": "SV",
    "domain": "saudia.com",
    "alliance": "SkyTeam",
    "bookable": "AF, DL, NH",
    "featured": false,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Korean Air",
    "award": "SkyPass",
    "iata": "KE",
    "domain": "koreanair.com",
    "alliance": "SkyTeam",
    "bookable": "AS, HA, EK, EY",
    "featured": true,
    "partners": [
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "AeroMexico",
    "award": "Rewards",
    "iata": "AM",
    "domain": "aeromexico.com",
    "alliance": "SkyTeam",
    "bookable": "G3, LY",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1.6", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "rove", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "Virgin Atlantic",
    "award": "Flyingclub",
    "iata": "VS",
    "domain": "virginatlantic.com",
    "alliance": "SkyTeam",
    "bookable": "AZ, HA, LA, LY, NH, NZ, SA, SQ, SK, VA",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:1", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" },
      { "bank": "marriott", "ratio": "3:1", "time": "Instant" }
    ]
  },
  {
    "name": "World Of Hyatt",
    "award": "Points",
    "iata": "",
    "domain": "hyatt.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "IHG Hotels & Resorts",
    "award": "One Rewards",
    "iata": "",
    "domain": "ihg.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Marriott",
    "award": "Bonvoy",
    "iata": "",
    "domain": "marriott.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "chase", "ratio": "1:1", "time": "Instant", "bonus": 50 },
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Hilton",
    "award": "Honors",
    "iata": "",
    "domain": "hilton.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:2", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:1", "time": "Instant" }
    ]
  },
  {
    "name": "Choice Hotels",
    "award": "Privilege",
    "iata": "",
    "domain": "choicehotels.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "amex", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:2", "time": "Instant" },
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "wellsfargo", "ratio": "1:2", "time": "Instant" }
    ]
  },
  {
    "name": "Wyndham Hotels & Resorts",
    "award": "Rewards",
    "iata": "",
    "domain": "wyndhamhotels.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "capitalone", "ratio": "1:1", "time": "Instant" },
      { "bank": "citi", "ratio": "1:2", "time": "Instant" }
    ]
  },
  {
    "name": "ALL - Accor Live Limitless",
    "award": "Points",
    "iata": "",
    "domain": "all.accor.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "capitalone", "ratio": "1:0.5", "time": "Instant" },
      { "bank": "citi", "ratio": "1:0.5", "time": "Instant" },
      { "bank": "bilt", "ratio": "1:0.6", "time": "Instant" },
      { "bank": "rove", "ratio": "1:0.6", "time": "Instant" }
    ]
  },
  {
    "name": "I Prefer Hotel Rewards",
    "award": "Points",
    "iata": "",
    "domain": "iprefer.com",
    "alliance": "Hotels",
    "bookable": "",
    "featured": false,
    "partners": [
      { "bank": "capitalone", "ratio": "1:2", "time": "Instant" },
      { "bank": "citi", "ratio": "1:4", "time": "Instant" }
    ]
  }
]