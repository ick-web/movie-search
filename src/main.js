import { getPopularMovies } from './api.js';
import { renderMovies, showModal } from './ui.js';

const moviesContainer = document.getElementById('movies-container');
const searchInput = document.querySelector('.search-bar input');

let popularMovies = []; // 인기 영화 데이터를 저장
let filteredMovies = []; // 검색 결과 데이터를 저장

// 초기 인기 영화 가져오기
async function loadPopularMovies() {
    try {
        const data = await getPopularMovies();
        popularMovies = data.results; // 인기 영화 데이터 저장
        renderMovies(popularMovies, moviesContainer); // 인기 영화 렌더링
    } catch (error) {
        console.error('인기 영화 로드 실패:', error);
    }
}

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase().trim(); // 검색어 처리
    if (searchQuery) {
        // 인기 영화 데이터에서 검색어에 해당하는 영화 필터링
        filteredMovies = popularMovies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery)
        );
        renderMovies(filteredMovies, moviesContainer); // 검색 결과 렌더링
    } else {
        // 검색어가 없으면 인기 영화 다시 표시
        renderMovies(popularMovies, moviesContainer);
    }
});

//  영화 카드 클릭 시 모달 표시
moviesContainer.addEventListener('click', (e) => {
    const movieCard = e.target.closest('.movie-card');
    if (movieCard) {
        const movieId = movieCard.getAttribute('data-id');
        const movie = popularMovies.find((m) => m.id == movieId);
        if (movie) showModal(movie);
    }
});




// 인기 영화 초기 로드
loadPopularMovies();
