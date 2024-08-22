import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { localeData, LocaleDataType } from "@/utils/locale";
import Tab from "./tab";
import Notes from "./notes";
import { FaSearch } from "react-icons/fa";
import Modal from "./modal";
import FindNotes from "./find-notes";
import { useRouter } from "next/router";

const HomePage = () => {
  const modalRef = useRef(null);

  const { locale } = useLocale();
  const localeWords: LocaleDataType = localeData[locale.toLowerCase()];
  const router = useRouter();
  const { search } = router.query;

  const [activeTab, setActiveTab] = useState("active");

  const handleChangeTab = (value: string) => {
    setActiveTab(value);
  };

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const handleSearch = ({ search }: { search: string }) => {
    router.push(`?search=${search}`);
    return { error: false, message: "success", data: null };
  };

  return (
    <div className="w-full h-full">
      <Modal ref={modalRef} title="Find notes" handleSubmit={handleSearch}>
        <FindNotes></FindNotes>
      </Modal>

      <button
        onClick={handleOpenModal}
        className="flex justify-center items-center fixed bottom-10 right-10 p-4 rounded-full border-4 border-transparent hover:border-current transition-all duration-300 "
      >
        <FaSearch className="w-6 h-6" />
      </button>

      <div className="flex w-full pt-8">
        <Tab
          identify={"active"}
          currTab={activeTab}
          onClickEvent={handleChangeTab}
        >
          {localeWords.tab_active}
        </Tab>
        <Tab
          identify={"archived"}
          currTab={activeTab}
          onClickEvent={handleChangeTab}
        >
          {localeWords.tab_archived}
        </Tab>
      </div>

      <section className=" w-full mt-8">
        {activeTab === "active" && <Notes isArchived={false} search={search} />}
        {activeTab === "archived" && (
          <Notes isArchived={true} search={search} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
