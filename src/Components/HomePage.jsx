import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';


const HomePage = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() =>{
        if(pasteId){
            const paste = allPastes.find((p) => p._id ===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
         
    }, [pasteId])


    function createPaste(){
        const paste={
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }
        if(pasteId){
            dispatch(updateToPastes(paste));
        }else{
            dispatch(addToPastes(paste));
        }
        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams('');

    }


  return (
    <div>
        <div className='flex flex-rowx place-content-between '>
            <input className='p-2 rounded-[10px]  bg-black w-[67%] pl-5' 
                type="text" 
                placeholder='Enter Content title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className='p-2 rounded-2xl bg-blue-400 text-white hover:text-[#535bf2]'
                onClick={createPaste}
            >
                {
                    pasteId ? "Update Paste" : "Create My Paste"
                }
            </button>
        </div>
        <div className=''>
            <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-black'
                value={value}
                placeholder='Enter content here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}

            ></textarea>
        </div>
    </div>
    
  )
}

export default HomePage
