function BorderLine({ children, classNameChildren, className }) {
    return (
        <div
            className={`text-white h-auto rounded-[12px] p-[2px] bg-gradient-to-br from-yellow-400 to-yellow-500 ${
                className || ''
            }`}
        >
            <div className={`w-full h-full bg-white rounded-[12px] ${classNameChildren || ''}`}>{children}</div>
        </div>
    );
}
export default BorderLine;
