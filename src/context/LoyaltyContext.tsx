import { createContext, useContext, useState, ReactNode } from "react";
import { mockLoyaltyAccounts } from "@/data/mockData";

interface LoyaltyContextType {
  connectedLoyaltyIds: string[];
  addLoyaltyPrograms: (programIds: string[]) => void;
  removeLoyaltyProgram: (programId: string) => void;
  getConnectedLoyaltyPrograms: () => typeof mockLoyaltyAccounts;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with all mock loyalty programs
  const [connectedLoyaltyIds, setConnectedLoyaltyIds] = useState<string[]>(
    mockLoyaltyAccounts.map(p => p.id)
  );

  const addLoyaltyPrograms = (programIds: string[]) => {
    setConnectedLoyaltyIds(prev => [...prev, ...programIds.filter(id => !prev.includes(id))]);
  };

  const removeLoyaltyProgram = (programId: string) => {
    setConnectedLoyaltyIds(prev => prev.filter(id => id !== programId));
  };

  const getConnectedLoyaltyPrograms = () => {
    return connectedLoyaltyIds
      .map(id => mockLoyaltyAccounts.find(program => program.id === id))
      .filter(program => program !== undefined);
  };

  return (
    <LoyaltyContext.Provider value={{ connectedLoyaltyIds, addLoyaltyPrograms, removeLoyaltyProgram, getConnectedLoyaltyPrograms }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};
