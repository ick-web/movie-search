fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    .then(res => res.json())
    .then(data => {
        movies = data.results; //영화 데이터 배열
        displayMovies(movies)
    })
    .catch(err => console.error(err));

    // async await로 바꾸기
async function fetchMovies() {
    try{
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    const data = await response.json();
    }catch (error){
        console.error
    }
}
