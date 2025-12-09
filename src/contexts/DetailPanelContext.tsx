import { createContext, useContext, useState, ReactNode } from "react";

export type DetailType = "project" | "experience" | "skill" | "education" | null;

export interface DetailData {
  type: DetailType;
  id: string;
  title: string;
  subtitle?: string;
  content: {
    description?: string;
    longDescription?: string;
    tech?: string[];
    highlights?: string[];
    period?: string;
    company?: string;
    link?: string | null;
    image?: string;
    achievements?: string[];
    challenges?: string[];
    results?: string[];
    role?: string;
    responsibilities?: string[];
    certificate?: string;
    institution?: string;
    year?: string;
    type?: string;
  };
}

interface DetailPanelContextType {
  isOpen: boolean;
  detailData: DetailData | null;
  openDetail: (data: DetailData) => void;
  closeDetail: () => void;
}

const DetailPanelContext = createContext<DetailPanelContextType | undefined>(undefined);

export function DetailPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detailData, setDetailData] = useState<DetailData | null>(null);

  const openDetail = (data: DetailData) => {
    setDetailData(data);
    setIsOpen(true);
    // Prevent body scroll when panel is open
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setIsOpen(false);
    // Restore body scroll
    setTimeout(() => {
      document.body.style.overflow = "unset";
      setDetailData(null);
    }, 300); // Wait for animation to complete
  };

  return (
    <DetailPanelContext.Provider value={{ isOpen, detailData, openDetail, closeDetail }}>
      {children}
    </DetailPanelContext.Provider>
  );
}

export function useDetailPanel() {
  const context = useContext(DetailPanelContext);
  if (context === undefined) {
    throw new Error("useDetailPanel must be used within a DetailPanelProvider");
  }
  return context;
}

