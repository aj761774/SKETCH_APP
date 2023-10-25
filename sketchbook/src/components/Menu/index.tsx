import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faEraser, faRotateRight, faRotateLeft, faFileArrowDown} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { actionItemClick, menuItemClick } from "@/slice/menuSlice";
import { MENU_ITEMS } from "@/constant";
import cx from "classnames";
import { useAppSelector } from "@/store";

const Menu = ()=> {
  const dispatch = useDispatch();
  const activeMenuItem = useAppSelector((state)=> state.menu.activeMenuItem);
  
  const handleMenuItemClick = (item: string)=> {
    dispatch(menuItemClick(item));
  }

  const handleActionItemClick = (item: string)=> {
    dispatch(actionItemClick(item))
  }

  return (
    <div className={styles.menuContainer}>
        <div className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL
        })} onClick={()=> handleMenuItemClick(MENU_ITEMS.PENCIL)}>
            <FontAwesomeIcon className={styles.icon} icon={faPencil}/>
        </div>
        <div className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.ERASER
        })} onClick={()=> handleMenuItemClick(MENU_ITEMS.ERASER)}>
            <FontAwesomeIcon className={styles.icon} icon={faEraser}/>
        </div>
        <div className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.UNDO
        })} onClick={()=> handleActionItemClick(MENU_ITEMS.UNDO)}>
            <FontAwesomeIcon className={styles.icon} icon={faRotateLeft}/>
        </div>
        <div className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.REDO
        })} onClick={()=> handleActionItemClick(MENU_ITEMS.REDO)}>
            <FontAwesomeIcon className={styles.icon} icon={faRotateRight}/>
        </div>
        <div className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD
        })} onClick={()=> handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
            <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
        </div>
    </div>
  )
}

export default Menu;