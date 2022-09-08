import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteInvestment } from "../../../features/investment/investmentSlice";
import Modal from "../Modal";

function MenuOption(props) {
  const { _id } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let menuRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <div ref={menuRef} className="menu-option">
      {/* option button */}
      <button
        type="button"
        className="option-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiDotsVertical />
      </button>

      {isOpen && (
        <div className="options">
          {/* edit option */}
          <div className="edit" onClick={() => navigate("./edit/" + _id)}>
            <RiEdit2Line /> Edit
          </div>

          <div className="divider"></div>

          {/* edit option */}
          <div
            className="delete"
            onClick={() => {
              setIsDeleteModal(!isDeleteModal);
              setIsOpen(!isOpen);
            }}
          >
            <RiDeleteBin5Line />
            Delete
          </div>
        </div>
      )}

      {/* delete confirmation */}
      <Modal isOpen={isDeleteModal} setIsOpen={setIsDeleteModal}>
        {/* content */}
        <p>Apakah anda ingin menghapus investasi ini?</p>
        <div className="delete-confirmation">
          <button
            className="yes"
            onClick={() => dispatch(deleteInvestment(_id))}
          >
            Ya
          </button>
          <button
            className="no"
            onClick={() => setIsDeleteModal(!isDeleteModal)}
          >
            Tidak
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MenuOption;
