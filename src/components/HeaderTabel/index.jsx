import React from 'react';

const HeaderTabel = ({ listTitle = [] }) => {
    return (
        <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                {listTitle.map((title, index) => (
                    <th key={index} className="py-3 px-6">
                        {title}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default HeaderTabel;
