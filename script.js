//! fetch
// 1. sebuah API pada javascript modern yang tugasnya mengambil data secara asynchronous atau ajax sama seperti melakukan XMLHttpRequest pada Vanilla JS atau menggunakan method Ajax pada Jquery
// 2. Sebuuah method pada API javascript untuk mengambil resource dari network/jaringan dan mengembalikan promise yang akan selesai ketika ada response yang tersedia


//* API Dengan Fetch 
// const searchBtn = document.querySelector('.search-btn');
// searchBtn.addEventListener('click', function () {

// 	const searchInput = document.querySelector('.input-keyword');
// 	fetch('http://www.omdbapi.com/?apikey=81a8f1a9&s=' + searchInput.value)
// 		.then(response => response.json())
// 		.then(response => {
// 			const movies = response.Search;
// 			let cards = '';
// 			movies.forEach(m => cards += showCards(m));
// 			const movieContainer = document.querySelector('.movie-container');
// 			movieContainer.innerHTML = cards;

// 			const showDetailsBtn = document.querySelectorAll('.modal-detail-btn');
// 			showDetailsBtn.forEach(btn => {
// 				btn.addEventListener('click', function () {
// 					const imdbId = this.dataset.imdbid;
// 					fetch('http://www.omdbapi.com/?apikey=81a8f1a9&i=' + imdbId)
// 						.then(response => response.json())
// 						.then(m => {
// 							const movieDetail = showMovieDetail(m);

// 							const modalBody = document.querySelector('.modal-body');
// 							modalBody.innerHTML = movieDetail;
// 						});
// 				});
// 			});
// 		})
// 		.catch(response => alert('Data Tidak Tersedia'));
// });




//* Fetch Refactor (Async Await)

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', async function () {
	try {
		const inputKeyword = document.querySelector('.input-keyword');
		const movies = await getMovies(inputKeyword.value);
		updateUI(movies);
	} catch (err) {
		alert(err);
	}

});


function getMovies(keyword) {
	return fetch('http://www.omdbapi.com/?apikey=81a8f1a9&s=' + keyword)
		.then(response => {
			if (response.ok === false) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(response => {
			if (response.Response === "False") {
				throw new Error(response.Error);
			}
			return response.Search;
		});
}

function updateUI(movies) {
	let cards = '';
	movies.forEach(m => cards += showCards(m));
	const movieContainer = document.querySelector('.movie-container');
	movieContainer.innerHTML = cards;
}



// event binding => memberi event ke element yang awalnya belum ada,tapi ketika ada eventnya tetap bisa jalan
document.addEventListener('click', async function (e) {
	if (e.target.classList.contains('modal-detail-btn')) {
		const imdbid = e.target.dataset.imdbid;
		const movieDetails = await getMovieDetails(imdbid);
		updateUIDetails(movieDetails);
	}
});


function getMovieDetails(imdbid) {
	return fetch('http://www.omdbapi.com/?apikey=81a8f1a9&i=' + imdbid)
		.then(response => response.json())
		.then(m => m)
}

function updateUIDetails(m) {
	const movieDetail = showMovieDetail(m);
	const modalBody = document.querySelector('.modal-body')
	modalBody.innerHTML = movieDetail;
}



function showCards(m) {
	return `<div class="col-md-3 my-3">
						<div class="card">
							<img src="${m.Poster}" class="card-img-top">
							<div class="card-body">
								<h5 class="card-title">${m.Title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
								<a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
							</div>
						</div>
					</div>`
};

function showMovieDetail(m) {
	return `<div class="container-fluid">
						<div class="row">
							<div class="col-md-3">
								<img src="${m.Poster}" class="img-fluid">
							</div>
							<div class="col-md">
								<ul class="list-group">
									<li class="list-group-item">
										<h4>${m.Title} (${m.Year})</h4>
									</li>
									<li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
									<li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
									<li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
									<li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
								</ul>
							</div>
						</div>
					</div>`
};