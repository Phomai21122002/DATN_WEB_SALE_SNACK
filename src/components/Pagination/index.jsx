import { memo } from 'react';

function Pagination({ page, setPage, totalPages, className }) {
    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const handlePageClick = (p) => {
        if (p === '...') return;
        setPage(p);
    };
    return (
        <div className={`flex items-center text-sm gap-2 mt-8 ${className ? className : 'justify-center'}`}>
            <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &lt;
            </button>
            {generatePageNumbers().map((p, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(p)}
                    className={`px-3 py-1 border rounded ${
                        p === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    disabled={p === '...'}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &gt;
            </button>
        </div>
    );
}
export default memo(Pagination);
