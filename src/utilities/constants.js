import { faCartShopping, faCreditCard, faRankingStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';

export const APP_NAME = 'Limo';

export const LOCAL_STORAGE_NAME = 'user';

export const BASE_URL = (import.meta.env.VITE_NODE_ENV === 'production') ? import.meta.env.VITE_BASE_URL : 'http://localhost:3001';

export const API_URL = BASE_URL + '/api/v1/'

export const LOCAL_STORAGE_RECENTLY_VIEWED = 'recently-viewed-products-limo-store'

export const STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar',
    'Chandigarh',
    'Daman & Diu',
    'Delhi',
    'Jammu & Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
]

export const SERVICES = [
    {
        id: 1,
        icon: faRankingStar,
        title: 'Quality',
        description: '100 % Original quality guaranteed',
    },
    {
        id: 2,
        icon: faCartShopping,
        title: '7 Days Replacement',
        description: 'On all orders*',
    },
    {
        id: 3,
        icon: faCreditCard,
        title: 'Secure Payments',
        description: "Visa, Mastercard, EMI, Net Banking, UPI, BHIM, Wallet's",
    },
    {
        id: 4,
        icon: faTruckFast,
        title: 'Fast & Free Shipping',
        description: 'Ships in 24 Hours *',
    }
]

export const TAGS = ['New arrival', 'Most purchased'];