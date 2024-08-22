import React, { useContext, useEffect, useState } from "react";
import LocaleContext from "@/contexts/locale-context";

interface Props {
  children: React.ReactNode;
}

const LocaleProvider: React.FC<Props> = ({ children }) => {
  const [locale, setLocale] = useState<string>("ID");

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "ID" ? "EN" : "ID";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const LocaleValue = { locale, toggleLocale };
  return (
    <LocaleContext.Provider value={LocaleValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

export const useLocale = () => {
  const localeCtx = useContext(LocaleContext);

  if (!localeCtx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return localeCtx;
};
