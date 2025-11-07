import { createContext, useContext, useState, ReactNode } from "react";
import { mockCards } from "@/data/mockData";

interface CardsContextType {
  connectedCardIds: string[];
  addCards: (cardIds: string[]) => void;
  removeCard: (cardId: string) => void;
  getConnectedCards: () => typeof mockCards;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with all mock cards in order
  const [connectedCardIds, setConnectedCardIds] = useState<string[]>(
    mockCards.map(c => c.id)
  );

  const addCards = (cardIds: string[]) => {
    setConnectedCardIds(prev => [...prev, ...cardIds.filter(id => !prev.includes(id))]);
  };

  const removeCard = (cardId: string) => {
    setConnectedCardIds(prev => prev.filter(id => id !== cardId));
  };

  const getConnectedCards = () => {
    return connectedCardIds
      .map(id => mockCards.find(card => card.id === id))
      .filter(card => card !== undefined);
  };

  return (
    <CardsContext.Provider value={{ connectedCardIds, addCards, removeCard, getConnectedCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
