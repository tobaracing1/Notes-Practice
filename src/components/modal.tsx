import React, {
  forwardRef,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import useToastOptions from "@/hooks/use-toast-options";

interface Props {
  children: React.ReactNode;
  title: string;
  handleSubmit ?: (data: { [key: string]: string }) => Promise<{ error: boolean, message: string }>;
}

export type ModalRefType = HTMLDialogElement | null

const Modal: React.FC<Props> = forwardRef(
  ({ children, title, handleSubmit }, ref) => {
    const modalState = useRef<HTMLDialogElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isClient, setIsClient] = React.useState(false);
    const toastOptions = useToastOptions();

    useImperativeHandle(ref, () => {
      return {
        open: openModal,
        close: closeModal,
      };
    });

    function openModal() {
      if (modalState.current) {
        modalState.current.showModal();
      }
    }

    function closeModal() {
      if (modalState.current) {
        modalState.current.close();
      }
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);

        //Extract data
        const formValues: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          formValues[key] = value.toString();
        });
        
        try {
          const { error, message } = await handleSubmit(formValues);

          toast[error ? 'error' : 'success'](message, toastOptions);
          toast.error('ASD', toastOptions)
          closeModal()
        
        } catch (err) {
          toast.error("An unexpected error occurred.", toastOptions);
        }
      }
    }

    // Set isClient to true only after the component is mounted
    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null; // Render nothing on the server
    return createPortal(
      <dialog ref={modalState} className="rounded-md">
        <div className="flex flex-col items-center p-8 min-w-[400px]">
          <h3 className="text-xl mb-4">{title}</h3>
          <form
            ref={formRef}
            method="dialog"
            className="flex flex-col w-full gap-y-4"
            onSubmit={handleFormSubmit}
          >
            {children}
          </form>
        </div>
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
