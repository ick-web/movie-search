const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTUzMjRlZWE5YTRiMWNiMTYxYzcxNWY5ZDMyODFkMCIsIm5iZiI6MTczNjI5OTY2My43MjMsInN1YiI6IjY3N2RkNDhmMTI2Njc5Njg4NTRlNTVmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DxNPJSAoVamTBU6sZECg6NdTcZ0Q4q6hOB6KuI9GiOo'
    }
};

const moviesContainer = document.getElementById('movies-container');
const searchInput = document.querySelector('.search-bar input');
let movies = [];

// TMDB API에서 인기 영화 가져오기
fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    .then(res => res.json())
    .then(data => {
        movies = data.results; //영화 데이터 배열
        displayMovies(movies)
    })
    
    .catch(err => console.error(err));

// 영화 카드 생성 및 DOM에 추가.
function displayMovies(moviesToDisplay) {
    moviesContainer.innerHTML = ''; // 기존 내용 초기화 (새로운 영화 목록 표시)
    moviesToDisplay.forEach(movie => {
        const { title, poster_path, vote_average, id } = movie;
        
        // 영화 카드 생성
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-id', id)

        // 포스터 이미지
        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        poster.alt = `${title} 포스터`;

        // 제목
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = title;

        // 평점
        const rating = document.createElement('p');
        rating.textContent = `평점: ${vote_average}`;

        // 카드에 요소 추가
        movieCard.appendChild(poster);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(rating);

        // 모달 클릭 이벤트 추가..
        movieCard.addEventListener('click', () => showMovieDetails(movie));

        // 컨테이너에 카드 추가
        moviesContainer.appendChild(movieCard);
    });
}

// 검색 기능.
searchInput.addEventListener('input', (e)=> {
    const searchQuery = e.target.value.toLowerCase(); //검색어 소문자
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery); //대소문자 구분 없이 검색
    })
    displayMovies(filteredMovies); //필터링된 영화 리스트 표시
});

// 모달창에 상세정보 표시
function showMovieDetails(movie){
    const modal = document.createElement('div');
    modal.classList.add('modal')

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content')

    const title = document.createElement('h2')
    title.textContent = movie.title

    const poster = document.createElement('img')
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = `${movie.title} 포스터`;

    // 요약
    const overView = document.createElement('p');
    overView.textContent = movie.overview;

    // 평점
    const rating = document.createElement('p');
    rating.textContent = `평점: ${movie.vote_average}`;

    //닫기 버튼
    const closeButton = document.createElement('button')
    closeButton.textContent = '닫기';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal)

    

    });

    modalContent.appendChild(title);
    modalContent.appendChild(poster);
    modalContent.appendChild(overView);
    modalContent.appendChild(rating);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}




