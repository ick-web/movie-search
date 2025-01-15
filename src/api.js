//TMDB API 요청관련 코드
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'Bearer YOUR_API_KEY';

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
