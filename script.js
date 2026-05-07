window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".custom-navbar");

    if (window.scrollY > 50) {
        navbar.style.background = "#020617";
        navbar.style.boxShadow = "0px 10px 30px rgba(0,0,0,0.4)";
    }
    else {
        navbar.style.background = "rgba(15, 23, 42, 0.85)";
        navbar.style.boxShadow = "none";
    }

});

console.log("Premium Portfolio Loaded");