function SkeletonCategory() {
    return (
        <div className="cursor-pointer animate-pulse">
            <div className="relative w-full h-[100px] overflow-hidden rounded-[100%] bg-gray-200" />
            <div className="mx-auto mt-2 h-4 w-1/2 rounded bg-gray-200" />
            <div className="mx-auto mt-1 h-3 w-full rounded bg-gray-200" />
            <div className="mx-auto mt-1 h-3 w-full rounded bg-gray-200" />
        </div>
    );
}

export default SkeletonCategory;
