import Image from "next/image";
import { createRef } from 'react';

const FileSelect = ({ label, className, ...props }) => {
  const inputRef = createRef();
  const preventTheThings = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }
  const onDrop = (evt) => {
    preventTheThings(evt);
    const { dataTransfer: { files }} = evt;
    inputRef.current.files = files;
  }
  return (
    <div className="w-full flex content-center flex-col flex-wrap">
      <div className="w-1/2 h-48
        border border-solid border-gray-300
        rounded
        flex flex-col
        align-center justify-center"
        onDrop={onDrop}
        onDragOver={preventTheThings}
        onDragEnter={preventTheThings}
        onDragLeave={preventTheThings}>
          <Image src="/files.svg" alt="Drag files here" width="48" height="48" />
          <div className="text-center
          mt-4">Drag files here</div>
      </div>
      <div className="w-1/2 mt-6">
        <label htmlFor="formFile" className="form-label inline-block mb-2">{label}</label>
        <input className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" multiple ref={inputRef} {...props} />
      </div>
    </div>
  );
}

export default FileSelect;