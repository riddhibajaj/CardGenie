// Mock data for CardGenie demo

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  lastFour: string;
  network: string;
  color: string;
  rewardsProgram: string;
  annualFee: number;
  creditLimit: number;
  currentBalance: number;
  categories: {
    name: string;
    rate: number;
  }[];
}

export interface LoyaltyAccount {
  id: string;
  program: string;
  balance: number;
  valueCents: number;
  expirationDate: string | null;
  daysUntilExpiration: number | null;
  icon: string;
}

export interface Alert {
  id: string;
  type: 'expiration' | 'bonus' | 'recommendation' | 'limit';
  severity: 'urgent' | 'warning' | 'info';
  title: string;
  message: string;
  valueAtRisk?: number;
  action?: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  cardId: string;
  rewardsEarned: number;
}

export interface Goal {
  id: string;
  name: string;
  targetValue: number;
  currentValue: number;
  targetDate: string;
  type: 'travel' | 'cashback' | 'statement_credit';
}

export const mockUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  totalRewardsValue: 284700, // in cents
  portfolioUtilization: 18,
  creditScore: 785,
  expiringValueSoon: 34000, // in cents
  optimizationScore: 78,
};

export const mockCards: CreditCard[] = [
  {
    id: "1",
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    lastFour: "4892",
    network: "Visa",
    color: "from-blue-900 to-blue-700",
    rewardsProgram: "Ultimate Rewards",
    annualFee: 550,
    creditLimit: 25000,
    currentBalance: 3420,
    categories: [
      { name: "Travel", rate: 3 },
      { name: "Dining", rate: 3 },
      { name: "Everything Else", rate: 1 },
    ],
  },
  {
    id: "2",
    name: "Amex Gold Card",
    issuer: "American Express",
    lastFour: "1004",
    network: "Amex",
    color: "from-yellow-600 to-yellow-500",
    rewardsProgram: "Membership Rewards",
    annualFee: 250,
    creditLimit: 18000,
    currentBalance: 1850,
    categories: [
      { name: "Dining", rate: 4 },
      { name: "Groceries", rate: 4 },
      { name: "Everything Else", rate: 1 },
    ],
  },
  {
    id: "3",
    name: "Citi Double Cash",
    issuer: "Citi",
    lastFour: "7823",
    network: "Mastercard",
    color: "from-gray-700 to-gray-600",
    rewardsProgram: "ThankYou Points",
    annualFee: 0,
    creditLimit: 15000,
    currentBalance: 2100,
    categories: [
      { name: "Everything", rate: 2 },
    ],
  },
  {
    id: "4",
    name: "Capital One Venture X",
    issuer: "Capital One",
    lastFour: "3391",
    network: "Visa",
    color: "from-red-900 to-red-700",
    rewardsProgram: "Venture Miles",
    annualFee: 395,
    creditLimit: 22000,
    currentBalance: 890,
    categories: [
      { name: "Travel", rate: 5 },
      { name: "Everything Else", rate: 2 },
    ],
  },
];

export const mockLoyaltyAccounts: LoyaltyAccount[] = [
  {
    id: "1",
    program: "Chase Ultimate Rewards",
    balance: 125340,
    valueCents: 187500,
    expirationDate: null,
    daysUntilExpiration: null,
    icon: "💎",
  },
  {
    id: "2",
    program: "Amex Membership Rewards",
    balance: 84200,
    valueCents: 84200,
    expirationDate: null,
    daysUntilExpiration: null,
    icon: "✨",
  },
  {
    id: "3",
    program: "United MileagePlus",
    balance: 45000,
    valueCents: 58500,
    expirationDate: "2025-03-15",
    daysUntilExpiration: 131,
    icon: "✈️",
  },
  {
    id: "4",
    program: "Marriott Bonvoy",
    balance: 28500,
    valueCents: 22800,
    expirationDate: "2025-02-01",
    daysUntilExpiration: 89,
    icon: "🏨",
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "expiration",
    severity: "urgent",
    title: "34,000 points expiring soon",
    message: "Your Marriott Bonvoy points ($228 value) expire in 89 days. Book a stay or transfer to airline partners.",
    valueAtRisk: 22800,
    action: "View Options",
    timestamp: "2024-11-04T10:30:00Z",
  },
  {
    id: "2",
    type: "bonus",
    severity: "info",
    title: "5X bonus activated on Chase Reserve",
    message: "Earn 5X points on all Lyft rides through December 31st.",
    action: "Learn More",
    timestamp: "2024-11-03T15:20:00Z",
  },
  {
    id: "3",
    type: "recommendation",
    severity: "warning",
    title: "Better card for groceries",
    message: "Using Amex Gold instead of Citi Double Cash would earn you $84 more per year on groceries.",
    action: "See Analysis",
    timestamp: "2024-11-02T09:15:00Z",
  },
  {
    id: "4",
    type: "limit",
    severity: "warning",
    title: "Utilization above 30%",
    message: "Your Chase Sapphire Reserve is at 35% utilization. Consider paying down balance to improve credit score.",
    action: "View Details",
    timestamp: "2024-11-01T14:45:00Z",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-11-04",
    merchant: "Whole Foods",
    category: "Groceries",
    amount: 12450,
    cardId: "2",
    rewardsEarned: 498,
  },
  {
    id: "2",
    date: "2024-11-03",
    merchant: "United Airlines",
    category: "Travel",
    amount: 45890,
    cardId: "1",
    rewardsEarned: 1377,
  },
  {
    id: "3",
    date: "2024-11-03",
    merchant: "Starbucks",
    category: "Dining",
    amount: 850,
    cardId: "2",
    rewardsEarned: 34,
  },
  {
    id: "4",
    date: "2024-11-02",
    merchant: "Amazon",
    category: "Shopping",
    amount: 8920,
    cardId: "3",
    rewardsEarned: 178,
  },
  {
    id: "5",
    date: "2024-11-01",
    merchant: "Shell Gas Station",
    category: "Gas",
    amount: 5500,
    cardId: "3",
    rewardsEarned: 110,
  },
];

export const mockGoals: Goal[] = [
  {
    id: "1",
    name: "Europe Trip Summer 2025",
    targetValue: 150000,
    currentValue: 125340,
    targetDate: "2025-06-01",
    type: "travel",
  },
  {
    id: "2",
    name: "Annual Cashback Goal",
    targetValue: 200000,
    currentValue: 84200,
    targetDate: "2024-12-31",
    type: "cashback",
  },
];

export const mockChatHistory = [
  {
    id: "1",
    role: "assistant" as const,
    content: "Hi Sarah! I'm your CardGenie AI assistant. I can help you maximize your rewards, choose the best card for any purchase, and track your points. What would you like to know?",
    timestamp: "2024-11-04T10:00:00Z",
  },
];

export const mockRecommendation = {
  bestCard: mockCards[0],
  estimatedReward: 945,
  reasoning: "Chase Sapphire Reserve offers 3X points on travel purchases, which translates to $28.35 in value when redeemed through the Chase travel portal (1.5x multiplier). This is the highest return among your cards for this transaction.",
  alternatives: [
    {
      card: mockCards[3],
      reward: 630,
      reason: "2X miles on all purchases = $12.60 value",
    },
    {
      card: mockCards[2],
      reward: 630,
      reason: "2% cashback = $6.30 value",
    },
  ],
};
