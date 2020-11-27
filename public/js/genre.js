const user = JSON.parse(localStorage.getItem("login"));
const $genreList = document.querySelector('.genre-list');
const $fragment = document.createDocumentFragment();

const parsedUrl = new URL(window.location.href);
const urlId = parsedUrl.searchParams.get("id");
console.log(urlId);

// 미 로그인 시 로그인 페이지로 이동
if (!user.curlog) {
  window.location.href = '/';
}
let genres = {};

// main에서 가져온 id값을 discover API에 넣어준다.
(async () => {
  const resGenres = await fetch (`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=ko`)
  const results = await resGenres.json();
  genres = results.genres;
  console.log(genres);

  const resDiscover = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${urlId}`);
  const { results: movies } = await resDiscover.json();
  const genreName = genres.find(genre => genre.id === +urlId);
  $main__name.textContent = genreName.name;
  movies.forEach(movie => render(movie));
  $result__movies.appendChild($fragment);
})();
  
  // render함수로 DOM생성
    const render = (movie) => {

    const $li = document.createElement(`li`);
    $li.id = movie.id;
    const $a = document.createElement('a');
    $a.href = '#';
    const $img = document.createElement('img');
    if (movie.poster_path === null) {
      $img.src = '../image/준비중.png';
    } else {
    $img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    }
    const textnode = document.createTextNode(movie.title);
    $a.appendChild($img);
    $a.appendChild(textnode);
    $li.appendChild($a);
    $fragment.appendChild($li);
  }
  
// nav 클릭 시 장르에 맞는 영화들 렌더링
$genreList.onclick = async e => {
  if(!e.target.matches('.genre-list > li > a')) return;
  $result__movies.innerHTML = '';
  let selectedGenre = genres.find(genre => genre.name === e.target.textContent);

  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre.id}`);
  const { results: movies } = await res.json();
  $main__name.textContent = selectedGenre.name;
  console.log(movies);
  movies.forEach(movie => render(movie));
  $result__movies.appendChild($fragment);
}

// 스크롤 top
$topBtn.onclick = e => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

// 스크롤이 최상단이면 topBtn 보이지 않기
window.onscroll= e => {
  let yOffset = window.pageYOffset;
  if (yOffset === 0) {
    $topBtn.style.display = 'none';
  } else {
    $topBtn.style.display = 'block';
  }
}