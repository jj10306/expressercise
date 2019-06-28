let prev = document.getElementById("back");
let refresh = document.getElementById("refresh");

prev.addEventListener("click", () => window.history.back());
refresh.addEventListener("click", () => location.reload());