import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const AddressDropdown = ({ open, data, selectedId, setValue, setOpen, onDeleteAddress, className }) => {
    if (!open) return null;

    return (
        <ul className={className}>
            {data?.map((address) => {
                return (
                    <li
                        key={address.id}
                        className={`flex justify-between items-center px-4 py-2 hover:bg-gray-100 group ${
                            selectedId === address.id ? 'font-bold text-blue-600 bg-blue-50' : ''
                        }`}
                    >
                        <div className="flex justify-between items-center gap-8">
                            <span
                                onClick={() => {
                                    setValue('addressId', address.id);
                                    setOpen(false);
                                }}
                                className="cursor-pointer text-sm"
                            >
                                {address.name}
                            </span>
                            {selectedId === address.id && (
                                <div className="min-w-[80px] justify-end text-center text-[12px] text-red-400 font-sm ring-1 ring-red-400 p-[2px]">
                                    Mặc Định
                                </div>
                            )}
                        </div>
                        {onDeleteAddress && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteAddress(address.id);
                                }}
                                className="text-red-500 invisible group-hover:visible"
                            >
                                <CloseIcon className="h-4 w-4" />
                            </button>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default AddressDropdown;
