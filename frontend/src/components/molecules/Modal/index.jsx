import { useEffect, useRef } from "react";

function Modal(props) {
  const { isOpen, setIsOpen } = props;

  let modalRef = useRef();

  useEffect(() => {
    // document.addEventListener("mousedown", (event) => {
    //   if (!modalRef.current?.contains(event.target)) {
    //     setIsOpen(false);
    //     console.log("mousedown");
    //   }
    // });
  }, []);
  return (
    <>
      {isOpen && (
        <div className="modals">
          <div
            onClick={() => setIsOpen(false)}
            className="modals-overlay"
          ></div>
          <div className="modals-container">
            {/* content */}
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
