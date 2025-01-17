//TMDB API 요청관련 코드
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTUzMjRlZWE5YTRiMWNiMTYxYzcxNWY5ZDMyODFkMCIsIm5iZiI6MTczNjI5OTY2My43MjMsInN1YiI6IjY3N2RkNDhmMTI2Njc5Njg4NTRlNTVmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DxNPJSAoVamTBU6sZECg6NdTcZ0Q4q6hOB6KuI9GiOo';

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/movie/popular?language=ko-KR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};
