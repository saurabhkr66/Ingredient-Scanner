"use client";
import { createContext, useContext, useState } from "react";

type CapturedImageContextType = {
  capturedFile: File | null;
  setCapturedFile: (file: File | null) => void;
};

const CapturedImageContext = createContext<CapturedImageContextType>({
  capturedFile: null,
  setCapturedFile: () => {},
});

export const CapturedImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  return (
    <CapturedImageContext.Provider value={{ capturedFile, setCapturedFile }}>
      {children}
    </CapturedImageContext.Provider>
  );
};

export const useCapturedImage = () => useContext(CapturedImageContext);
