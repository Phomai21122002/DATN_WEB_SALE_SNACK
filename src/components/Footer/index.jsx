import React from 'react';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

import logoSale from '~/assets/images/Logo-sales.png';

function Footer() {
    return (
        <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left mt-[50px]">
            {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
            <div className="max-w-[80%] mx-auto py-10 text-center md:text-left">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* <!-- TW Elements section --> */}
                    <div>
                        <h6 className="mb-4 flex items-center justify-center text-sm font-semibold md:justify-start">
                            <Link
                                to={routes.home}
                                className="w-14 h-14 overflow-hidden rounded-full mr-2 cursor-pointer"
                            >
                                <img src={logoSale} alt="Logo" className="object-contain" />
                            </Link>
                            Phô Mai Shop
                        </h6>
                        <p className="text-sm text-justify">
                            Chào mừng bạn đến với shop đồ ăn vặt của chúng mình! Tại đây, bạn sẽ tìm thấy đủ loại món
                            ngon từ bánh kẹo, snack, trà sữa siêu hấp dẫn. Hãy để tụi mình làm thỏa mãn cơn thèm ăn vặt
                            của bạn mỗi ngày nhé!
                        </p>
                    </div>
                    {/* <!-- Products section --> */}
                    <div className="text-sm">
                        <iframe
                            title="Phô Mai Shop"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8342169500065!2d108.13407707460004!3d16.07409043930882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421f94a20c2503%3A0xb07b0c95ad2dfd55!2zVG_DoCBFMywgQ2h1bmcgY8awIE5ow6Ag4bufIHjDoyBo4buZaSBLQ04gSG_DoCBLaMOhbmg!5e0!3m2!1svi!2s!4v1749899638864!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    {/* <!-- Contact section --> */}
                    <div className=" text-sm">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">Liên hệ</h6>

                        <p className="mb-4 flex items-center justify-center md:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5"
                            >
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                            Toà E3, Chung cư Nhà ở xã hội KCN Hoà Khánh
                        </p>

                        <p className="mb-4 flex items-center justify-center md:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5"
                            >
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            thanhmai.20570@gmail.com
                        </p>

                        <p className="mb-4 flex items-center justify-center md:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            +84 774 758 142
                        </p>

                        <p className="flex items-center justify-center md:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            +84 905 834 767
                        </p>
                    </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div className="bg-neutral-200 p-6 text-sm text-center dark:bg-neutral-700">
                <span>© 2024 - Thành lập từ năm 2024 bởi: </span>
                <a className="font-semibold text-neutral-600 dark:text-neutral-400" href="https://tw-elements.com/">
                    Phô Mai
                </a>
            </div>
        </footer>
    );
}
export default Footer;
