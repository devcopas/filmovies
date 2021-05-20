//* Fetch Refactor (Async Await)

const movieContainer = document.querySelector(".movie-container");
const inputKey = document.querySelector(".input-keyword");
const movieDetailModal = document.querySelector("#movieDetailModal");
const modalBody = document.querySelector('.modal-body');

const loadMovies = async function () {
	const movies = await getMovies();

	inputKey.addEventListener('keyup', function (e) {
		const keyword = e.target.value.toLowerCase();
		let cards = '';
		let isFoud = false;

		movies.forEach(m => {
			const moviesTitle = m.Title.toLowerCase();
			if (moviesTitle.indexOf(keyword) !== -1) {
				cards += showCards(m);
				isFoud = true;
			}
		});

		if (!isFoud) movieContainer.innerHTML = "";
		else movieContainer.innerHTML = cards;
	})

	return updateUI(movies);
}
loadMovies();


function getMovies() {
	return fetch('https://www.omdbapi.com/?s=fast+furious&apikey=81a8f1a9')
		.then(response => {
			if (response.ok === false) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(response => {
			if (response.Response === "False") {
				throw new Error(response.Error);
			} else console.log(response)
			return response.Search;
		});
}

function updateUI(movies) {
	let cards = '';
	movies.forEach(m => {
		cards += showCards(m)
		console.log(showCards(m));
	});
	movieContainer.innerHTML = cards;
}



// event binding => memberi event ke element yang awalnya belum ada,tapi ketika ada eventnya tetap bisa jalan
// document.addEventListener('click', async function (e) {
// 	if (e.target.classList.contains('modal-detail-btn')) {
// 		const imdbid = e.target.dataset.imdbid;
// 		const movieDetails = await getMovieDetails(imdbid);
// 		updateUIDetails(movieDetails);
// 	}
// });

$('#movieDetailModal').on('show.bs.modal', async function (e) {
	const idImdb = e.relatedTarget.dataset.imdbid;
	const movieDetails = await getMovieDetails(idImdb);
	updateUIDetails(movieDetails);
})

$('#movieDetailModal').on('hidden.bs.modal', async function (e) {
	modalBody.innerHTML = "";
})


function getMovieDetails(imdbid) {
	return fetch('https://www.omdbapi.com/?apikey=81a8f1a9&i=' + imdbid)
		.then(response => response.json())
		.then(m => {
			console.log(m);
			return m
		})
}

function updateUIDetails(m) {
	const movieDetail = showMovieDetail(m);
	modalBody.innerHTML = movieDetail;
}


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


function showCards(m) {
	return `<div class="col-10 col-md-2 my-3">
						<div class="card">
							<div class="cover-image" style="background-image:url('${m.Poster}')">
							<img src="https://www.maternaldisaster.com/wp-content/themes/maternaldisaster/assets/img/frame-thumbs-blank.svg" class="card-img-top">
							</div>
							<div class="card-body">
								<h5 class="card-title text-hidden">${m.Title}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
								<a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
							</div>
						</div>
					</div>`
};


// function showCards(m) {
// 	return `<div class="col-10 col-md-2 my-3">
// 						<div class="card">
// 							<img src="${m.Poster}" class="card-img-top">
// 							<div class="card-body">
// 								<h5 class="card-title text-hidden">${m.Title}</h5>
// 								<h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
// 								<a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
// 							</div>
// 						</div>
// 					</div>`
// };