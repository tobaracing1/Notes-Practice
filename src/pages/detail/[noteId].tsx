import React from "react";
import NoteDetail from "@/components/note-detail";
import { useRouter } from "next/router";
// import NoteViewPage from "@/modules/notes/view";

const NoteDetailPage = () => {
  const router = useRouter()
  const {noteId} = router.query

  return <NoteDetail noteId={noteId as string}></NoteDetail>;
};

export default NoteDetailPage;
// export default NoteViewPage;

