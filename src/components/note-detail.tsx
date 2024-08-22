import React, { useRef } from "react";
import { formatDate } from "@/utils/date";
import { useLocale } from "@/hooks/use-locale";
import { localeData } from "@/utils/locale";
import { useRouter } from "next/router";
import useGetNote from "@/hooks/use-get-note";
import { LottieLoading } from "@/assets/lottie";
import Lottie from "lottie-react";
import ButtonArchive from "./button-archive";
import ButtonUnarchive from "./button-unarchive";
import { deleteNote } from "@/utils/api";
import { toast } from "react-toastify";
import useToastOptions from "@/hooks/use-toast-options";
import Modal from "./modal";

interface Props {
  noteId: string;
}

const NoteDetail: React.FC<Props> = ({ noteId }) => {
  const { note, isLoading, error } = useGetNote({ noteId });

  const { locale } = useLocale();
  const localeWords = localeData[locale.toLowerCase()];
  const router = useRouter();
  const toastOptions = useToastOptions();
  const modalRef = useRef(null);

  function handleBack() {
    router.back();
  }

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  if (isLoading)
    return (
      <Lottie
        animationData={LottieLoading}
        style={{ margin: "auto", height: "80vh" }}
      ></Lottie>
    );

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <Modal ref={modalRef} title="Are you sure you want to delete this note?">
        <button
          onClick={() => {
            deleteNote({ noteId });
            handleCloseModal();
            router.push('/')
          }}
          className="flex self-end border py-2 px-4 rounded-md"
          type="button"
        >
          Delete
        </button>
      </Modal>

      <button onClick={handleBack} className="fixed bottom-12 left-8">
        Back
      </button>
      <button className="fixed bottom-12 right-8" onClick={handleOpenModal}>
        Delete
      </button>

      {note?.data && (
        <>
          <h1 className="font-semibold text-lg">{note?.data.title}</h1>
          <div className="text-sm font-light">
            {formatDate({ date: note?.data.createdAt, locale })}
          </div>
          <p className="text-sm font-normal">{note?.data.body}</p>

          {note?.data.archived ? (
            <ButtonUnarchive noteId={noteId} />
          ) : (
            <ButtonArchive noteId={noteId} />
          )}
        </>
      )}
    </div>
  );
};

export default NoteDetail;
