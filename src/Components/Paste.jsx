import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast'
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())

  );
  function hanldleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));

  }

  return (
    <div className='items-center flex flex-col content-center'>
      {/* Input Field */}
      <input className='p-2 rounded-[10px] min-w-[600px] mt-5 bg-black'
      type='search' 
        placeholder='Search Your Paste title here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Results Feed */}
      <div className='flex flex-col gap-5  m-5 content-center self-center w-[100%]'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border rounded-[10px]' key={paste?._id}>
                    <div className='flex place-content-between w-[100%] '>
                      <div className='p-2 text-2xl pl-5 font-bold mt-4'>
                        {paste.title}
                      </div>
                      <div className='flex flex-row g-4 place-content-evenly text-xs mb-3 mr-1.5'> 
                        <button className='m-[4px] px-[10px] py-[0px] mt-5 text-[#646cff]'>
                          <a href={`/?pasteId=${paste?._id}`} className=''>Edit
                          </a>
                        </button>
                        <button className='m-[4px] px-[10px] py-[0px] mt-5 text-[#646cff]' >
                          <a href={`/pastes/${paste?._id}`}>
                          View
                          </a>
                        </button >
                        <button className='m-[4px] px-[10px] py-[0px] mt-5 text-[#646cff]' 
                        onClick={() => hanldleDelete(paste?._id)}>
                          Delete
                        </button>
                        <button className='m-[4px] px-[10px] py-[0px] mt-5 text-[#646cff]'
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("Copy to Clipboard")
                        }}>
                          Copy
                        </button>
                        <button className='m-[4px] px-[10px] py-[0px] mt-5 text-[#646cff]'
                            onClick={() => {
                              if (navigator.share) {
                                navigator
                                  .share({
                                    title: 'Check this Paste',
                                    text: paste?.content,
                                    url: window.location.origin + `/pastes/${paste?._id}`,
                                  })
                                  .then(() => toast.success('Shared successfully!'))
                                  .catch((error) => toast.error('Error sharing: ' + error));
                              } else {
                                toast.error('Sharing not supported on this browser.');
                              }
                            }}
                          >
                            Share
                          </button>
                      </div>
                    </div>
                    <div className='text-left w-[100%] p-5 '>
                      {paste.content}
                    </div>
                  <div className='text-right px-3 py-2 text-blue-200 flex justify-end'>
                    <span className='mr-1.5 font-[500] text-blue-400'>Created at : </span>{new Date(paste.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })} 
                  </div>

                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
