interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBackground = ({ onClose, children }: Props) => {
  return (
    <div
      className="fixed inset-0 z-40 flex justify-center items-center bg-[var(--modal-bg)]"
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
