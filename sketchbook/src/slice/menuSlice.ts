import { MENU_ITEMS } from "@/constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMenuInitialState {
    activeMenuItem: string;
    actionMenuItem: string | null;
}

const initialState: IMenuInitialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null
}

const menuSlice = createSlice({
    name: "menu",
    initialState: initialState,
    reducers: {
      menuItemClick: (state, action: PayloadAction<string>)=> {
        state.activeMenuItem = action.payload
      },
      actionItemClick: (state, action: PayloadAction<string | null>) => {
        state.actionMenuItem = action.payload
      }
    }
})

export const {menuItemClick, actionItemClick} = menuSlice.actions;

export default menuSlice.reducer;