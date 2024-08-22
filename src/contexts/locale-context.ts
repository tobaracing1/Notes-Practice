import { createContext } from "react";

type LocaleValueType = {
    locale: string;
    toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleValueType | undefined>(undefined);

export default LocaleContext;