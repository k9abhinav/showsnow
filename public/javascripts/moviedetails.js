const APIKEY = 'api_key=0e7fb9630b7a8648f2250631b68d391d';
const baseURL = 'https://api.themoviedb.org/3';
const APIURL = baseURL + '/discover/movie?sort_by=popularity.desc&'+APIKEY;
const imageURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = baseURL + '/search/movie?'+APIKEY;
getMovieDetails(APIURL)

function getMovieDetails(url){
    fetch(url).then(res => res.json()).then(data => {
        showDetails(data.results);
    })
}

const detailsmain = document.querySelector('.main-detail')

function showDetails (datas){
    detailsmain.innerHTML=''

    datas.forEach(movies =>{
        const {title, poster_path, vote_average,vote_count,release_date,overview } = movies;
        const movieDetails = document.createElement('div');
        movieDetails.classList.add('container');
        movieDetails.innerHTML= `
        
        
        <div class="imgclass">
            <div class="up-content">
                <div class="img1">
                    <img src="${imageURL+poster_path}" alt="${title}" />
                </div>
                <div class="content">
                    <div class="name">
                        Leo
                    </div>
                    <div class="star">
                        <i class="fa fa-star checked" style="font-size:24px"></i> 8.3/10
                    </div>

                    <div class="lang">

                        Tamil, Telugu, Hindi, Kannada
                    </div>
                    <div class="bio">
                        2h 45m Action, Thriller
                    </div>
                    <div class="bookticket">
                        <button class="btn">Book Tickets</button>
                    </div>
                </div>
            </div>

            <img src="${imageURL+poster_path}" alt="Image1" class="leotag" />
        </div>
        <div class="down-content">
            <h2 class="heading2">
                About the movie
            </h2>

            <p>
                A cafe owner becomes a local hero but his actions being forth consequences from a dangerous world that can shake his carefully constructed life.
            </p>
            <hr>

            <div class="cast">
                <h2>Cast</h2>

                <div class="cast-images">

                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Vijay Image" class="cimage">
                        <div class="names">Vijay</div>
                        <div class="role">as Leo Das</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Thrisha Image" class="cimage">
                        <div class="names">Thrisha Krishnan</div>
                        <div class="role">as Satya</div>

                    </div>

                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Dutt Image" class="cimage">
                        <div class="names">Sanjay Dutt</div>
                        <div class="role">as Antony Das</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Arjun Image" class="cimage">
                        <div class="names">Arjun Sarja</div>
                        <div class="role">as Harold Das</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Priya Image" class="cimage">
                        <div class="names">Priya Anand</div>
                        <div class="role">as Deepa Andrews</div>
                    </div>


                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Menon Image" class="cimage">
                        <div class="names">Gautham Menon</div>
                        <div class="role">as Joshy Andrews</div>
                    </div>


                </div>

                <hr>
            </div>
            <div class="crew">
                <h2>Crew</h2>
                <div class="cast-images">
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Vijay Image" class="cimage">
                        <div class="names">Lokesh Kanagraj</div>
                        <div class="role">Director Writer</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Thrisha Image" class="cimage">
                        <div class="names">S.S.Lalit Kumar</div>
                        <div class="role">Producer</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Anirudh Image" class="cimage">
                        <div class="names">Anirudh Ravichander</div>
                        <div class="role">Musician Singer</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Vijay Image" class="cimage">
                        <div class="names">Vijay</div>
                        <div class="role">Musician</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Ratna Image" class="cimage">
                        <div class="names">Ratna Kumar</div>
                        <div class="role">Dialogue Writer</div>
                    </div>
                    <div class="imgcc">
                        <img src="${imageURL+poster_path}" alt="Editor Image" class="cimage">
                        <div class="names">Philomin Raj</div>
                        <div class="role">Editor</div>
                    </div>
                </div>

            </div>
        </div>


        
        `
        // console.log(movieDetails.innerHTML)
        
    detailsmain.appendChild(movieDetails);
    })
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

{/* <img src="${ imageURL+poster_path }" alt="${title}">
        <div class="detail-info">
            <h1>${title}</h1>
            <h3>${vote_average}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
            <h3>${vote_count}k people liked it</h3>
        <p>${overview}</p>
        <span class="released">Released on ${release_date}</span>
        <br/>
        <button class="booking">Book Tickets</button>
        </div> */}