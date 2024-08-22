import React from "react";

interface Props {
  children: React.ReactNode;
  currTab: string;
  identify: string;
  onClickEvent: (value:string) => void
  className?: string;
}

const Tab: React.FC<Props> = ({ children, className, identify, currTab, onClickEvent }) => {
  

  return (
    <button
        onClick={() => onClickEvent(identify)}
      className={`flex justify-center items-center w-1/2 py-2 border-b-2  transition-all duration-300 ease-out hover:border-b-4 ${
        identify === currTab ? "border-b-4" : "border-transparent"
      }  ${className}`}
    >
      {children}
    </button>
  );
};

export default Tab;
