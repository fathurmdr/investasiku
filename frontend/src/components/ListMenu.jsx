import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import MenuOption from "./MenuOption";

function ListMenu(props) {
  const navigate = useNavigate();
  return (
    <div className="list-menu">
      {props.menu &&
        props.menu.map((el, index) => (
          <li key={index}>
            <div className="detail" onClick={() => navigate(el.link)}>
              <p>{el.menu}</p>
              <RiArrowRightSLine />
            </div>

            {/* option button */}
            {props.optionButton && <MenuOption _id={el._id} />}
          </li>
        ))}
    </div>
  );
}

export default ListMenu;
