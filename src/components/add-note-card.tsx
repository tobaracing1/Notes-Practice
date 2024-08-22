import useFieldText from "@/hooks/use-field-text";
import useRichFieldText from "@/hooks/use-rich-field-text";
import React from "react";
import { useLocale } from "@/hooks/use-locale";
import { localeData } from "@/utils/locale";

interface Props {
  closeModal: () => void;
}

const AddNoteCard: React.FC<Props> = ({ closeModal }) => {
  const { locale } = useLocale();
  const localeWords = localeData[locale.toLowerCase()];

  const [title, onTitleChange] = useFieldText();
  const [body, onBodyChange] = useRichFieldText();

  return (
    <>
      <input
        type="text"
        name="title"
        id="title"
        className="border py-2 px-4"
        placeholder={localeWords.dialog_title_placeholder}
        defaultValue={title}
        onChange={onTitleChange}
      />
      <textarea
        name="body"
        id="body"
        rows={8}
        className="border py-2 px-4"
        placeholder={localeWords.dialog_body_placeholder}
        defaultValue={body}
        onChange={onBodyChange}
      ></textarea>

      <button
        onClick={closeModal}
        className="flex self-end border py-2 px-4 rounded-md"
        type="submit"
      >
        Add
      </button>
    </>
  );
};

export default AddNoteCard;
