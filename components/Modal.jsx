export const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <h1 className="modal_h1">Please Enter a Valid City Name</h1>
      <h2 className="modal_h2">City Not Found</h2>
      <button
        className="btn_modal"
        onClick={() => {
          console.log("clicked");
          onClose();
        }}
      >
        Close
      </button>
    </div>
  );
};
