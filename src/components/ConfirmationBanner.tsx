import { useEffect, useRef } from 'react';

interface ConfirmationBannerProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationBanner({ message, onConfirm, onCancel }: ConfirmationBannerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className="confirmation-dialog">
      <div className="confirmation-content">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-actions">
          <button onClick={onConfirm} className="btn-confirm">Confirm</button>
          <button onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </dialog>
  );
}
