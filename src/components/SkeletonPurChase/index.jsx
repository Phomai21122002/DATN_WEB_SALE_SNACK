function PurchaseSkeleton() {
    return (
        <div className="w-full mb-16 shadow-lg rounded-lg overflow-hidden animate-pulse bg-white">
            <div className="flex flex-col pt-4 px-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                    <div className="h-5 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="flex w-full items-center py-4 border-b border-gray-200 justify-between">
                    <div className="flex items-center gap-4 w-2/3">
                        <div className="w-24 h-24 bg-gray-300 rounded border flex-shrink-0"></div>
                        <div className="flex flex-col gap-2">
                            <div className="h-5 bg-gray-300 rounded w-40"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
            </div>
            <div className="flex flex-col items-end p-4">
                <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="flex gap-4">
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSkeleton;
