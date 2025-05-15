export default function SkeletonRow({ col }) {
    return (
        <tr className="animate-pulse border-b">
            {Array.from({ length: col }).map((_, index) => (
                <td key={index} className="py-3 px-6">
                    <div className="h-4 bg-gray-200 rounded"></div>
                </td>
            ))}
        </tr>
    );
}
