export const convertRatingData = (data) => ({
    1: data?.starOne || 0,
    2: data?.starTwo || 0,
    3: data?.starThree || 0,
    4: data?.starFour || 0,
    5: data?.starFive || 0,
    totalRating: data?.starOne + data?.starTwo + data?.starThree + data?.starFour + data?.starFive || 0,
    starAverage: data?.starAverage,
});

export const getRatingDescription = (starAverage) => {
    if (starAverage >= 1 && starAverage < 2) {
        return 'ĐÁNH GIÁ THẤP';
    } else if (starAverage >= 2 && starAverage < 3) {
        return 'ĐÁNH GIÁ TRUNG BÌNH';
    } else if (starAverage >= 3 && starAverage < 4) {
        return 'ĐÁNH GIÁ KHÁ TỐT';
    } else if (starAverage >= 4 && starAverage <= 5) {
        return 'ĐÁNH GIÁ TỐT';
    } else {
        return 'CHƯA ĐÁNH GIÁ';
    }
};
