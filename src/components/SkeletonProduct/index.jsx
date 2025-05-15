function SkeletonProduct() {
    return (
        <div className="pb-4 rounded-md shadow-md animate-pulse">
            <div className="relative w-full h-[150px] overflow-hidden rounded-tr-md rounded-tl-md bg-gray-200"></div>
            <div className="px-2">
                <div>
                    <div className="my-1 h-3 w-3/4 rounded bg-gray-200" />
                    <div className="mx-auto my-1 h-3 w-full rounded bg-gray-200" />
                    <div className="mx-auto my-1 h-3 w-full rounded bg-gray-200" />
                    <div className="flex items-center justify-between gap-8">
                        <div className="mx-auto my-1 h-3 w-full rounded bg-gray-200" />
                        <div className="mx-auto my-1 h-3 w-full rounded bg-gray-200" />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2 gap-8">
                    <div className="mx-auto my-1 h-6 w-full rounded bg-gray-200" />
                    <div className="mx-auto my-1 h-6 w-full rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export default SkeletonProduct;
