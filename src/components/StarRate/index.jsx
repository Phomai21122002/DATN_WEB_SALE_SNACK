import { memo } from 'react';
import StarIcon from '@mui/icons-material/Star';
function StarRate({ className, sizeStar, rating, setRating, gap }) {
    return (
        <div style={{ display: 'flex', gap: gap }}>
            {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                return (
                    <label key={index} className={className}>
                        <input
                            type="radio"
                            name="rate"
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                            style={{ display: 'none' }}
                        />
                        <StarIcon
                            sx={{
                                color: currentRate <= rating ? '#FFD700' : '#B0B0B0',
                                cursor: 'pointer',
                                width: sizeStar,
                                height: sizeStar,
                                verticalAlign: 'middle',
                            }}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default memo(StarRate);
