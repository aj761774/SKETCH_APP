import { MENU_ITEMS, COLORS } from "@/constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IToolBoxInitialState {
   [key: string]: {
    color?: string;
    size?: number
   },
}

const initialState: IToolBoxInitialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.DOWNLOAD]: {},
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {}
}

const toolBoxSlice = createSlice({
    name: "toolbox",
    initialState: initialState,
    reducers: {
      changeColor: (state, action: PayloadAction<{item: string, color: string}>)=> {
        state[action.payload.item].color = action.payload.color
      },
      changeBrushSize: (state, action: PayloadAction<{item: string, size: number}>) => {
        state[action.payload.item].size = action.payload.size
      }
    }
})

export const {changeColor, changeBrushSize} = toolBoxSlice.actions;

export default toolBoxSlice.reducer;