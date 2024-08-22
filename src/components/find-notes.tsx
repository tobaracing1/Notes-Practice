import useFieldText from "@/hooks/use-field-text";
import { useLocale } from "@/hooks/use-locale";
import { localeData } from "@/utils/locale";
import React from "react";

const FindNotes = () => {
  const [search, onChangeSearch] = useFieldText();
  const { locale } = useLocale();
  const localeWords = localeData[locale.toLowerCase()];

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        className="border py-2 px-4"
        placeholder={localeWords.dialog_search_title}
        defaultValue={search}
        onChange={onChangeSearch}
      />
      <button>Find</button>
    </>
  );
};

export default FindNotes;
