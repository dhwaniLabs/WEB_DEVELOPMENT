const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light</span>';
}

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i> <span>Light</span>';

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i> <span>Dark</span>';

        localStorage.setItem("theme", "light");
    }

});