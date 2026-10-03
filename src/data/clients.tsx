// Direct asset imports bundled and hashed by Vite for 100% reliable loading across all environments
import luluLogo from '../assets/clients/lulu.png';
import bismiLogo from '../assets/clients/bismi.png';
import nestoLogo from '../assets/clients/nesto.png';
import kalyanLogo from '../assets/clients/kalyan.png';
import pothysLogo from '../assets/clients/pothys.png';
import moolansLogo from '../assets/clients/moolans.png';
import relianceLogo from '../assets/clients/reliance-smart-bazaar.png';
import supplycoLogo from '../assets/clients/supplyco.png';
import peekayLogo from '../assets/clients/peekay.png';
import jamjoomLogo from '../assets/clients/jamjoom.png';
import budgetLogo from '../assets/clients/budget.png';
import grandFreshLogo from '../assets/clients/grand-fresh.png';
import freshDayLogo from '../assets/clients/freshday.png';
import dayMartLogo from '../assets/clients/daymart.png';
import dhanyaLogo from '../assets/clients/dhanya.png';

export interface ClientItem {
  id: string;
  name: string;
  category: 'Hypermarket' | 'Supermarket';
  logoUrl: string;
}

export const majorClientsData: ClientItem[] = [
  {
    id: 'lulu',
    name: 'LuLu Hypermarket',
    category: 'Hypermarket',
    logoUrl: luluLogo,
  },
  {
    id: 'bismi',
    name: 'Bismi Hypermart',
    category: 'Hypermarket',
    logoUrl: bismiLogo,
  },
  {
    id: 'nesto',
    name: 'Nesto Hypermarket',
    category: 'Hypermarket',
    logoUrl: nestoLogo,
  },
  {
    id: 'kalyan',
    name: 'Kalyan Hypermarket',
    category: 'Hypermarket',
    logoUrl: kalyanLogo,
  },
  {
    id: 'pothees',
    name: 'Pothys Super Stores',
    category: 'Supermarket',
    logoUrl: pothysLogo,
  },
  {
    id: 'moolans',
    name: 'Moolans Hypermart',
    category: 'Hypermarket',
    logoUrl: moolansLogo,
  },
  {
    id: 'reliance',
    name: 'Reliance Smart Bazaar',
    category: 'Hypermarket',
    logoUrl: relianceLogo,
  },
  {
    id: 'supplyco',
    name: 'Supplyco Supermarket',
    category: 'Supermarket',
    logoUrl: supplycoLogo,
  },
  {
    id: 'peekay',
    name: 'Peekay Hypermarket',
    category: 'Hypermarket',
    logoUrl: peekayLogo,
  },
  {
    id: 'jamjoom',
    name: 'Jamjoom Hypermarket',
    category: 'Hypermarket',
    logoUrl: jamjoomLogo,
  },
  {
    id: 'budget',
    name: 'Budget Hypermarket',
    category: 'Hypermarket',
    logoUrl: budgetLogo,
  },
  {
    id: 'grandfresh',
    name: 'Grand Fresh Supermarket',
    category: 'Supermarket',
    logoUrl: grandFreshLogo,
  },
  {
    id: 'freshday',
    name: 'Fresh Day Hypermarket',
    category: 'Hypermarket',
    logoUrl: freshDayLogo,
  },
  {
    id: 'daymart',
    name: 'Day Mart Hypermarket',
    category: 'Hypermarket',
    logoUrl: dayMartLogo,
  },
  {
    id: 'dhanya',
    name: 'Dhanya Supermarket',
    category: 'Supermarket',
    logoUrl: dhanyaLogo,
  },
];
