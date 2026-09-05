import { useEffect, useState, type ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const CLOSE_ANIMATION_MS = 180;

export function Modal({ onClose, children }: ModalProps) {
  const [closing, setClosing] = useState(false);

  function requestClose() {
    setClosing(true);
    setTimeout(onClose, CLOSE_ANIMATION_MS);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={closing ? "modal-overlay closing" : "modal-overlay"}
      onClick={requestClose}
    >
      <div
        className={closing ? "modal-box closing" : "modal-box"}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={requestClose}
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
