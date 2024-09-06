const btnPopup = document.querySelector('.btnLogin-popup');
const cover_box = document.querySelector('.cover-box');
const LoginLink = document.querySelector('.login-link');
const SignUpLink = document.querySelector('.signup-link');
const iconClose = document.querySelector('.icon-close');

function activateCoverBox() {
    cover_box.classList.add('active');
}

function deactivateCoverBox() {
    cover_box.classList.remove('active');
}

function activatePopup() {
    cover_box.classList.add('active-popup');
}

function deactivateCoverPopup() {
    cover_box.classList.remove('active-popup');
}

SignUpLink.addEventListener('click', activateCoverBox);
LoginLink.addEventListener('click', deactivateCoverBox);
btnPopup.addEventListener('click', activatePopup);
iconClose.addEventListener('click', deactivateCoverPopup);
