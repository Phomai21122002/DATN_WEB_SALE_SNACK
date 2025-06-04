export const convertRatingData = (data) => ({
    1: data?.starOne || 0,
    2: data?.starTwo || 0,
    3: data?.starThree || 0,
    4: data?.starFour || 0,
    5: data?.starFive || 0,
    totalRating: data?.starOne + data?.starTwo + data?.starThree + data?.starFour + data?.starFive || 0,
    starAverage: data?.starAverage,
});
