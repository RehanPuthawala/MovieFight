// *---------------FetchData Function----------------//

const autoComplete = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    const moviePoster = document.createElement("img");
    addElementToDOM(moviePoster, "movie__poster", "src", `${imgSrc}`);

    const movieTitle = document.createElement("h1");
    addElementToDOM(movieTitle, "movie__title", null, null, movie.Title);

    return moviePoster, movieTitle;
  },

  fetchData: async (searchTerm) => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/",
      {
        params: {
          apikey: "5cb133d8",
          s: searchTerm,
        },
      }
    );

    if (response.data.Error) return [];
    return response.data.Search;
  },
};

createAutoComplete({
  ...autoComplete,
  autoCompleteWidget: document.querySelector(".left-autocomplete"),
  whereToAppend: document.querySelector(".movieDetailContainer-left"),
  onOptionSelect(item, whereToAppend) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    fetchEachItem(item, whereToAppend, "left");
  },
});

createAutoComplete({
  ...autoComplete,
  autoCompleteWidget: document.querySelector(".right-autocomplete"),
  whereToAppend: document.querySelector(".movieDetailContainer-right"),
  onOptionSelect(item, whereToAppend) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    fetchEachItem(item, whereToAppend, "right");
  },
});

// *---------------Fetch Each Movie Function----------------//

let leftMovie;
let rightMovie;

const fetchEachItem = async (movie, whereToAppend, side) => {
  const movieResponse = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/",
    {
      params: {
        apikey: "5cb133d8",
        i: movie.imdbID,
      },
    }
  );

  whereToAppend.innerHTML = movieTemplate(movieResponse.data);

  if (side === "left") {
    leftMovie = movieResponse.data;
  } else {
    rightMovie = movieResponse.data;
  }

  if (leftMovie && rightMovie) {
    runComparison(leftMovie, rightMovie);
  }
};

// *---------------Run Comparison Function----------------//

const runComparison = (leftMovie, rightMovie) => {
  // Compare Box Office
  if (leftMovie.BoxOffice !== "N/A" || rightMovie.BoxOffice !== "N/A") {
    let leftMovieBoxOffice = parseInt(
      leftMovie.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );
    let rightMovieBoxOffice = parseInt(
      rightMovie.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );

    if (leftMovieBoxOffice > rightMovieBoxOffice) {
      document.querySelector(
        ".movieDetailContainer-left .boxOffice"
      ).style.backgroundColor = "springgreen";
    } else {
      document.querySelector(
        ".movieDetailContainer-right .boxOffice"
      ).style.backgroundColor = "springgreen";
    }
  } else {
    document.querySelector(
      ".movieDetailContainer-left .boxOffice"
    ).style.backgroundColor = "red";

    document.querySelector(
      ".movieDetailContainer-right .boxOffice"
    ).style.backgroundColor = "red";
  }

  //Compare MetaScore
  if (leftMovie.Metascore !== "N/A" || rightMovie.Metascore !== "N/A") {
    let leftMovieMetaScore = parseFloat(leftMovie.Metascore);
    let rightMovieMetaScore = parseFloat(rightMovie.Metascore);

    if (leftMovieMetaScore > rightMovieMetaScore) {
      document.querySelector(
        ".movieDetailContainer-left .metaScore"
      ).style.backgroundColor = "springgreen";
    } else {
      document.querySelector(
        ".movieDetailContainer-right .metaScore"
      ).style.backgroundColor = "springgreen";
    }
  } else {
    document.querySelector(
      ".movieDetailContainer-left .metaScore"
    ).style.backgroundColor = "red";

    document.querySelector(
      ".movieDetailContainer-right .metaScore"
    ).style.backgroundColor = "red";
  }

  //Compare IMDBRating
  if (leftMovie.imdbRating !== "N/A" || rightMovie.imdbRating !== "N/A") {
    let leftMovieImdbRating = Math.round(parseFloat(leftMovie.imdbRating));
    let rightMovieImdbRating = Math.round(parseFloat(rightMovie.imdbRating));

    if (leftMovieImdbRating > rightMovieImdbRating) {
      document.querySelector(
        ".movieDetailContainer-left .imdbRating"
      ).style.backgroundColor = "springgreen";
    } else {
      document.querySelector(
        ".movieDetailContainer-right .imdbRating"
      ).style.backgroundColor = "springgreen";
    }
  } else {
    document.querySelector(
      ".movieDetailContainer-left .imdbRating"
    ).style.backgroundColor = "red";

    document.querySelector(
      ".movieDetailContainer-right .imdbRating"
    ).style.backgroundColor = "red";
  }

  //Compare IMDBVotes
  if (leftMovie.imdbVotes !== "N/A" || rightMovie.imdbVotes !== "N/A") {
    let leftMovieImdbVotes = Math.round(
      parseFloat(leftMovie.imdbVotes.replace(/,/g, ""))
    );
    let rightMovieImdbVotes = Math.round(
      parseFloat(rightMovie.imdbVotes.replace(/,/g, ""))
    );

    if (leftMovieImdbVotes > rightMovieImdbVotes) {
      document.querySelector(
        ".movieDetailContainer-left .imdbVotes"
      ).style.backgroundColor = "springgreen";
    } else {
      document.querySelector(
        ".movieDetailContainer-right .imdbVotes"
      ).style.backgroundColor = "springgreen";
    }
  } else {
    document.querySelector(
      ".movieDetailContainer-left .imdbVotes"
    ).style.backgroundColor = "red";

    document.querySelector(
      ".movieDetailContainer-right .imdbVotes"
    ).style.backgroundColor = "red";
  }

  //Compare Awards
  if (leftMovie.Awards !== "N/A" || rightMovie.Awards !== "N/A") {
    let leftMovieAwards = rightMovie.Awards.split(" ").reduce(
      (accum, currval) => {
        const number = parseInt(currval);

        if (isNaN(number)) {
          return accum;
        } else {
          return accum + number;
        }
      },
      0
    );

    let rightMovieAwards = rightMovie.Awards.split(" ").reduce(
      (accum, currval) => {
        const number = parseInt(currval);

        if (isNaN(number)) {
          return accum;
        } else {
          return accum + number;
        }
      },
      0
    );

    console.log(leftMovieAwards, rightMovieAwards);

    if (leftMovieAwards > rightMovieAwards) {
      document.querySelector(
        ".movieDetailContainer-left .awards"
      ).style.backgroundColor = "springgreen";
    } else {
      document.querySelector(
        ".movieDetailContainer-right .awards"
      ).style.backgroundColor = "springgreen";
    }
  } else {
    document.querySelector(
      ".movieDetailContainer-left .awards"
    ).style.backgroundColor = "red";

    document.querySelector(
      ".movieDetailContainer-right .awards"
    ).style.backgroundColor = "red";
  }
};

// *---------------Movie Template Function----------------//

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image"><img src="${movieDetail.Poster}" alt="Movie Poster"></p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article class="notification is-primary awards">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary boxOffice">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box office</p>
    </article>
    <article class="notification is-primary metaScore">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary imdbRating">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary imdbVotes">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
