// UI 렌더링 관련 코드 - export 영화카드, 모달 상세정보창 

export const renderMovies = (movies, container) => {
    container.innerHTML = ''; // 기존 내용 초기화 (새로운 영화 목록 표시)
    movies.forEach(movie => {
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

    // 영화카드 클릭 이벤트 추가..
    movieCard.addEventListener('click', () => showMovieDetails(movie));

    // 컨테이너에 카드 추가
    container.appendChild(movieCard);
});
}

// 모달 창 상세정보
export const showModal = (movie) => {
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
    closeButton.addEventListener('click', () => document.body.removeChild(modal));

    // 백그라운드를 클릭해도 닫아지게 하기
    modal.addEventListener('click', (e) => {
        if(e.target === modal){  //모달(배경) 클릭 시 닫음
            document.body.removeChild(modal)
        }
    })

    modalContent.appendChild(title);
    modalContent.appendChild(poster);
    modalContent.appendChild(overView);
    modalContent.appendChild(rating);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}