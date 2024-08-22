import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { getNote } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
}

const useGetNote = ({ noteId }: { noteId: string }) => {

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => getNote(noteId),
  });

  return { note, isLoading, error };
};

export default useGetNote;
