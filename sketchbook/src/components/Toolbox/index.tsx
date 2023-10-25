import cx from 'classnames';
import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '@/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { changeBrushSize, changeColor } from '@/slice/toolBoxSlice';
import { ChangeEvent } from 'react';

const Toolbox = () => {
    const dispatch = useAppDispatch();
    const activeMenuItem = useAppSelector((state)=> state.menu.activeMenuItem);
    const {color,size} = useAppSelector((state)=> state.toolbox[activeMenuItem]);
    const showStorkeOptions = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrush = activeMenuItem === MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER;

    const updateBrushSize = (e: ChangeEvent<HTMLInputElement>)=> {
      dispatch(changeBrushSize({item: activeMenuItem ,size: +e.target.value}))
    }

    const updateSelectedColor = (color: string)=> {
        dispatch(changeColor({item: activeMenuItem ,color}))
    }

    return (<div className={styles.toolboxContainer}>
        {showStorkeOptions && <div className={styles.toolItem}>
            <h4 className={styles.toolText}>Stroke Color</h4>
            <div className={styles.itemContainer}>
                {
                    Object.values(COLORS).map((boxColor)=> (
                        <div key={boxColor} className={cx(styles.colorBox, {[styles.active]: color === boxColor})} style={{backgroundColor: boxColor}} onClick={() => updateSelectedColor(boxColor)}/>
                    ))
                }
            </div>
        </div>}
        {showBrush && <div className={styles.toolItem}>
            <h4 className={styles.toolText}>Brush Size</h4>
            <div className={styles.itemContainer}>
                <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} value={size}/>
            </div>
        </div>}
    </div>)
}

export default Toolbox;