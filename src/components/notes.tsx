import React, { useEffect, useState } from "react";
import Note from "./note";
import { getActiveNotes, getArchivedNotes } from "@/utils/api";
import { useLocale } from "@/hooks/use-locale";
import { localeData } from "@/utils/locale";
import useGetNotes from "@/hooks/use-get-notes";

interface NoteProps {
  createdAt: string;
  title: string;
  body: string;
  id: string;
}

interface NotesProps {
  isArchived: boolean;
  search?: string;
}

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={`flex flex-col gap-y-2 p-4 w-full animate-pulse shadow-md shadow-black/20 dark:shadow-white/20`}
      >
        <h1 className="font-semibold text-lg h-8 w-3/4 animate-pulse bg-background-dark dark:bg-background-light"></h1>
        <div className="text-sm font-light h-4 w-1/4 animate-pulse bg-background-dark dark:bg-background-light"></div>
        <p className="text-sm font-normal h-6 w-1/2 animate-pulse bg-background-dark dark:bg-background-light"></p>
      </div>

      <div
        className={`flex flex-col gap-y-2 p-4 w-full animate-pulse shadow-md shadow-black/20 dark:shadow-white/20`}
      >
        <h1 className="font-semibold text-lg h-8 w-3/4 animate-pulse bg-background-dark dark:bg-background-light"></h1>
        <div className="text-sm font-light h-4 w-1/4 animate-pulse bg-background-dark dark:bg-background-light"></div>
        <p className="text-sm font-normal h-6 w-1/2 animate-pulse bg-background-dark dark:bg-background-light"></p>
      </div>
    </div>
  );
};

const ErrorSkeleton = ({ error }: { error: string | undefined }) => {
  return <div>{error}</div>;
};

const Notes: React.FC<NotesProps> = ({ isArchived, search = "" }) => {
  const { notes, isLoading, error } = useGetNotes({ isArchived });

  const { locale } = useLocale();
  const localeWords = localeData[locale.toLowerCase()];

  if (isLoading) return <Skeleton />;
  if (error || notes?.error)
    return <ErrorSkeleton error={notes?.message ?? error?.message} />;

  const filteredNotes = notes?.data?.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-y-4">
      {notes?.data && notes?.data.length === 0 && (
        <p>{localeWords.content_empty_note}</p>
      )}

      {(search !== "" ? filteredNotes : notes?.data)?.map((note: NoteProps) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            createdAt={note.createdAt}
            body={note.body}
          ></Note>
        );
      })}
    </div>
  );
};

export default Notes;
