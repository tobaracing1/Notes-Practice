import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { getActiveNotes, getArchivedNotes, getNote } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useGetNotes = ({ isArchived}: { isArchived: boolean }) => {
  const cacheKey = isArchived ? "archived" : "actived";
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notes", cacheKey],
    queryFn: isArchived ? getArchivedNotes : getActiveNotes,
    refetchInterval: 5000
  });


  return { notes, isLoading, error };
};

export default useGetNotes;
