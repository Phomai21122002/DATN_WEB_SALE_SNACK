import { Avatar, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserItems, ToDoList } from './constant';
import Collapse from '~/components/Collapse';
import HeaderAdmin from '~/components/HeaderAdmin';
import { stringAvatar } from '~/utils/color';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActiveClassname = (path) => {
        return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200';
    };

    return (
        <>
            <HeaderAdmin />
            <div className="flex justify-center w-full">
                <div className="flex w-[80%] gap-4 mt-8 mb-8">
                    <div className="w-1/4 text-sm text-textColor p-2 shadow-md rounded-lg">
                        <div className="flex flex-col gap-[4px]">
                            {UserItems().map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`hover:cursor-pointer flex items-center p-2 rounded-md ${isActiveClassname(
                                            item.path,
                                        )}`}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <span className="flex items-center justify-center">{item.icon}</span>
                                        <span className="ml-2 font-semibold">{item.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="my-4">
                            <Divider />
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto">
                            {ToDoList().map((itemList, index) => (
                                <Collapse
                                    key={index}
                                    size="sm"
                                    className={'rounded-lg'}
                                    position="right"
                                    title={
                                        <div className="flex items-center gap-4 text-base">
                                            <Avatar
                                                sx={{
                                                    ...stringAvatar(itemList.title)?.sx,
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                {itemList.title?.[0]}
                                            </Avatar>
                                            <div className="text-sm font-bold">{itemList.title}</div>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col gap-[4px]">
                                        {itemList.list?.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`hover:cursor-pointer pl-4 py-2 rounded-md flex items-center ${isActiveClassname(
                                                    item.path,
                                                )}`}
                                                onClick={() => navigate(item.path)}
                                            >
                                                <span className="flex items-center justify-center">{item.icon}</span>
                                                <span className="ml-2">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Collapse>
                            ))}
                        </div>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
