import React from "react";
import { formatDate } from "@/utils/date";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";
import Link from "next/link";

interface NoteProps{
    createdAt: string,
    title: string,
    id: string,
    body: string
}

const Note: React.FC<NoteProps> = ({
    createdAt, title, body, id
}) => {
  const { locale } = useLocale();
  const { theme } = useTheme();
  
  return (
    <Link
        href={`detail/${id}`}
      className={`flex flex-col gap-y-2 p-4 shadow-md hover:dark:bg-gray-700 hover:bg-gray-200 ${
        theme === "light" ? "shadow-black/20" : "shadow-white/40"
      }`}
    >
      <h1 className="font-semibold text-lg">{title}</h1>
      <div className="text-sm font-light">
        {formatDate({ date:createdAt, locale })}
      </div>
      <p className="text-sm font-normal">{body}</p>
    </Link>
  );
};

export default Note;
