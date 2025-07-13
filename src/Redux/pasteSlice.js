import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
};


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
        const paste = action.payload;
        // 🔴 Validate title
        if (!paste.title || paste.title.trim() === "") {
        toast.error("Title cannot be empty");
        return;
        }
        // 🔴 Validate content
        if (!paste.content || paste.content.trim() === "") {
            toast.error("Content cannot be empty");
            return;
        }
        // 🔁 Check if paste already exists (based on title + content, or _id)
        const exists = state.pastes.some(
        (item) =>
          (item.title?.trim() || "") === (paste.title?.trim() || "") &&
          (item.content?.trim() || "") === (paste.content?.trim() || "")
        );

        if (exists) {
          toast.error("Paste already exists");
          return;
        }
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Created Successfully")
    },
    updateToPastes: (state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);
        if (index >= 0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste updated");
        }
    },
    resetAllPastes: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
        const pasteId = action.payload;

        console.log(pasteId);
        const index = state.pastes.findIndex((item)=> item._id === pasteId);

        if(index >=0){
            state.pastes.splice(index, 1);

            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            
            toast.success("paste deleted");

        }

    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
