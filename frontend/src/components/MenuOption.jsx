import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteInvestment } from "../features/investment/investmentSlice";

function MenuOption(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let menuRef = useRef();
  let deleteRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
      if (!deleteRef.current?.contains(event.target)) {
        setIsDeleteModal(false);
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
          <div className="edit" onClick={() => navigate("./edit/" + props._id)}>
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

      {isDeleteModal && (
        <div className="modals">
          <div className="modals-overlay">
            <div ref={deleteRef} className="modals-container">
              {/* content */}
              <p>Apakah anda ingin menghapus investasi ini?</p>
              <div className="delete-confirmation">
                <button
                  className="yes"
                  onClick={() => dispatch(deleteInvestment(props._id))}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuOption;
