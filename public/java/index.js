window.addEventListener("load", function(){
    document.getElementById("preloading").style.display = "none";
    document.body.style.overflow = "visible";
})





function toggleSideNavbar() {
    const sideNavbar = document.getElementById('navbarToggleExternalContent');
    sideNavbar.classList.toggle('open');
}