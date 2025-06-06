import { memo } from 'react';
import Button from '../Button';
import CoverPopUp from '../CoverPopUp';

function PopUpRemove({ title, desc, onRemove, onClose, isRemove }) {
    return (
        <CoverPopUp isOpen={isRemove} onClose={onClose}>
            <div className="bg-white p-6 rounded-lg w-[400px] relative">
                <h2 className="text-xl font-bold text-gray-800 text-center">{title}</h2>
                <p className="mt-4 text-lg font-light text-justify text-gray-600">{desc}</p>
                <div className="flex items-center justify-evenly mt-4">
                    <Button
                        handle={onClose}
                        title={'Hủy'}
                        classNameButton={'bg-gray-400 hover:bg-gray-500 text-white'}
                    />
                    <Button
                        handle={onRemove}
                        title={'Xóa'}
                        classNameButton={'bg-red-400 hover:bg-red-500 text-white'}
                    />
                </div>
            </div>
        </CoverPopUp>
    );
}

export default memo(PopUpRemove);
