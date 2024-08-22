import React, { useRef } from "react";
import NavLink from "./nav-link";
import ButtonTheme from "./button-theme";
import ButtonLocale from "./button-locale";
import { localeData, LocaleDataType } from "@/utils/locale";
import { useLocale } from "@/hooks/use-locale";
import { useAuth } from "@/hooks/use-auth";
import { useModal } from "@/hooks/use-modal";
import Modal from "./modal";
import AddNoteCard from "./add-note-card";
import { addNote } from "@/utils/api";

const Navigation = () => {
  const { locale } = useLocale();
  const localeWords: LocaleDataType = localeData[locale.toLowerCase()];
  const { modalIsOpen, toggleModal } = useModal();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const { auth, setAuth } = useAuth();

  function logout() {
    setAuth(null);
    localStorage.removeItem("accessToken");
  }

  function handleOpenModal() {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }

  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  const authenticated = auth !== null && auth.error !== true;

  return (
    <nav className="flex justify-between items-center">
      <Modal
        ref={modalRef}
        title={localeWords.navigation_add_note}
        handleSubmit={addNote}
      >
        <AddNoteCard closeModal={handleCloseModal}></AddNoteCard>
      </Modal>
      <NavLink href="/">{localeWords.navigation_notes}</NavLink>

      <div className="flex items-center gap-x-4">
        {authenticated ? (
          <button onClick={handleOpenModal}>
            {localeWords.navigation_add_note}
          </button>
        ) : (
          <NavLink href="/login" className="text-base font-medium">
            {localeWords.navigation_login}
          </NavLink>
        )}

        {authenticated ? (
          <button onClick={logout}>{localeWords.navigation_logout}</button>
        ) : (
          <NavLink href="/register" className="text-base font-medium">
            {localeWords.navigation_register}
          </NavLink>
        )}

        <ButtonTheme />
        <ButtonLocale />
      </div>
    </nav>
  );
};

export default Navigation;
