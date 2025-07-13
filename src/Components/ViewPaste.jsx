import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';

const ViewPaste = () => {
  const {id} = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.filter((p) => p._id === id)[0];

  



  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between '>
            <input className='p-2 rounded-xl bg-black w-[100%] pl-5' 
            type="text" 
            // placeholder='Enter your code here' 
            disabled
            value={paste.title}
            onChange={(e) => setTitle(e.target.value)}
            />
            {/* <button className='p-2 rounded-2xl mt-2'
                onClick={createPaste}
            >
                {
                    pasteId ? "Update Paste" : "Create My Paste"
                }
            </button> */}
        </div>
        <div className='mt-2'>
            <textarea className='rounded-xl min-w-[500px] p-4 bg-black'
                value={paste.content}
                // placeholder='Enter content here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
                disabled

            ></textarea>
        </div>
    </div>
  )
}

export default ViewPaste
