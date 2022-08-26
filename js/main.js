// navbar
let navbarWidth = 0,
    isNavbarClose = true;

// form validation
let userName = $("#name"),
    userEmail = $("#email"),
    userPhone = $("#phone"),
    userAge = $("#age"),
    userPassword = $("#password"),
    userRePassword = $("#rePassword"),
    
    userNameAlert = $("#namealert"),
    userEmailAlert = $("#emailalert"),
    userPhoneAlert = $("#phonealert"),
    userAgeAlert = $("#agealert"),
    userpasswordAlert = $("#passwordalert"),
    userRepasswordAlert = $("#repasswordalert");

function openCloseSidbar() {

    $(".strip-toggel-menu").click(function() {
        if(isNavbarClose) {
            
            navbarWidth = $(".nav-tab-menu").width() - 10, 
            
            $(".nav-tab-menu").addClass("open-menu").removeClass("close-menu");
            $(".strip-header-nav").css("left", navbarWidth), 
            $(".fa-align-justify").toggleClass("fa-times"),
           
            $(".nav-tab-menu .item1").animate({ opacity: "1", paddingTop: "25px" }, 1100);
            $(".nav-tab-menu .item2").animate({ opacity: "1", paddingTop: "25px" } , 1200);
            $(".nav-tab-menu .item3").animate({ opacity: "1", paddingTop: "25px" }, 1300);
            $(".nav-tab-menu .item4").animate({ opacity: "1", paddingTop: "25px" }, 1400);
            $(".nav-tab-menu .item5").animate({ opacity: "1", paddingTop: "25px" }, 1500);
            $(".nav-tab-menu .item6").animate({ opacity: "1", paddingTop: "25px" }, 1600);
            
            isNavbarClose = false;
        } else {
            $(".nav-tab-menu").addClass("close-menu").removeClass("open-menu");
            $(".fa-align-justify").toggleClass("fa-times");
            $(".strip-header-nav").css("left", 0);
            $(".nav-tab-menu li").animate({ opacity: "0", paddingTop: "500px" }, 500);

            isNavbarClose = true;
        }
   });
}

function userNameValid() {
    return true == /^[a-zA-Z0-9]+$/.test(userName.val()) ? (userNameAlert.css('display', 'none'), true) : (userNameAlert.css('display','block'), false)
}

function userEmailValid() {
    return 1 == /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/.test(userEmail.val()) ? (userEmailAlert.css('display', 'none'), true) : (userEmailAlert.css('display','block'), false)
}

function userPhoneValid() {
    return 1 == /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.val()) ? (userPhoneAlert.css('display', 'none'), true) : (userPhoneAlert.css('display','block'), false)
}

function userAgeValid() {
    return 1 == /^[1-9][0-9]?$|^100$/.test(userAge.val()) ? (userAgeAlert.css('display', 'none'), true) : (userAgeAlert.css('display','block'), false)
}

function userPasswordValid() {
    return 1 == /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.val()) ? (userpasswordAlert.css('display', 'none'), true) : (userpasswordAlert.css('display','block'), false)
}

function userRePasswordValid() {
    return userPassword.val() == userRePassword.val() ? (userRepasswordAlert.css('display', 'none'), true) : (userRepasswordAlert.css('display','block'), false)
}

function formValid() {
    userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid() 
        ? document.getElementById("submitBtn").disabled = false 
        : document.getElementById("submitBtn").disabled = true
}

function formVaidation() {
    userName.on("keyup", () => {
        userNameValid();
        formValid();
    }) 
    userEmail.on("keyup", () => {
        userEmailValid();
        formValid();
    })
    userPhone.on("keyup", () => {
        userPhoneValid();
        formValid(); 
    }) 
    userAge.on("keyup", () => {
        userAgeValid();
        formValid(); 
    }) 
    userPassword.on("keyup", () => {
        userPasswordValid();
        formValid(); 
    }) 
    userRePassword.on("keyup", () => {
        userRePasswordValid();
        formValid(); 
    })
}

let allMovies,
    row = $("#rowData"),
    allMoviesByWord = $("#allMovies"),
    moviesBySearch = $("#word"),
    categorylinks = $(".nav-category"),
    URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44",

    NowURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    trendingURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    latestURL = "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    topratedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44",

    imgPath = "https://image.tmdb.org/t/p/w500";

async function getAllMovies() {
    let movies = await fetch(URL);
    let data = await movies.json();
    allMovies = data.results;
    displayMovies(allMovies);
} 

async function getMoviesByWord(word) {
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${word}`) 
    let data = await movies.json();
    allMovies = data.results;
    if(!allMovies) getAllMovies();
    displayMovies(allMovies);
}

function displayMovies($allMovies) {
    
    var moviesHtml = "";

    if($allMovies) {
        for (i = 0; i < $allMovies.length; i++) {
            moviesHtml += `
                <div class="col-md-6 col-lg-4 my-3 custom-margin shadow">
                    <div class="movie shadow rounded position-relative">
                        <div class="post">
                            <img src="${imgPath + $allMovies[i].poster_path }" class="img-fluid rounded">
                            <div class="layer d-flex align-items-center ">
                                <div class="info p-0">
                                    <h2>${$allMovies[i].original_title}</h2>
                                    <p>${$allMovies[i].overview}</p>
                                    <p>rate: ${allMovies[i].vote_average}</p>
                                    <p>${$allMovies[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    } else {
        moviesHtml = '';
    }
    
    row.html(moviesHtml); 
}

allMoviesByWord.on('keyup', function() {
    getMoviesByWord($(this).val());
});

moviesBySearch.on('keyup', function() {
    let word = $(this).val();
    if (!word) {
        displayMovies(allMovies);
    } else {
        let _allMovies = allMovies.filter(function(item, index) {
            return item.original_title.includes(word);
        });
        displayMovies(_allMovies);
    }
});

categorylinks.on('click', function() {
    console.log($(this).text())
    switch($(this).text()) {
        case "Now playing": {
            URL = NowURL;
            getMovies();
        }; break;
        case "Popular": {
            URL = popularURL;
            getAllMovies();
        }; break;
        case "Top Rated": {
            URL = topratedURL;
            getAllMovies();
        }; break;
        case "Latest": {
            URL = latestURL;
            getAllMovies();
        }; break;
        case "Trending": {
            URL = trendingURL;
            getAllMovies();
        }; break;
        case "Upcoming": {
            URL = upcomingURL;
            getAllMovies()
        }; break;
    }
})

// ready
$(function() {
    getAllMovies()
    openCloseSidbar();
    formVaidation();
});