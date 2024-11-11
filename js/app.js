const modal = document.querySelector('.modal');
const homePage = document.querySelector('.homePage');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const passwordInput = document.querySelector('#password');
const btn = document.querySelector('#btn');
const quite = document.querySelector('#quite');
const navbar = document.querySelector('.navbar');
const loadingElement = document.querySelector('.loading');

function validate() {
    if (input.value.trim().length === 0) {
        alert("Iltimos, username ni qayta to'ldiring!");
        input.focus();
        input.style.borderColor = 'red';
        return false;
    } else if (input.value.length < 3) {
        alert("Login 3ta harfdan kam bo'lmaydi!");
        input.focus();
        input.style.borderColor = 'red';
        return false;
    } else if (passwordInput.value.trim().length === 0) {
        alert("Iltimos, password ni qayta to'ldiring!");
        passwordInput.focus();
        passwordInput.style.borderColor = 'red';
        return false;
    }
    return true;
}

function getUserFromLocalStorage() {
    let value = [];
    if (localStorage.getItem('user')) {
        value = JSON.parse(localStorage.getItem('user'));
    }
    return value;
}

function updateNavbar(username) {
    navbar.innerHTML = `<h1>Hello ${username}!</h1>`;
}

function showLoading() {
    loadingElement.style.display = 'flex';
    setTimeout(() => {
        loadingElement.style.display = 'none';
    }, 3000);
}

btn && btn.addEventListener('click', function(event) {
    event.preventDefault();
    let isValidate = validate();
    if (!isValidate) {
        return;
    }
    const spassword = "123456";
    if (passwordInput.value === spassword) {
        modal.style.display = "none";
        homePage.style.display = 'flex';

        updateNavbar(input.value);
    } else {
        alert("Iltimos, password ni qayta kiriting!");
        passwordInput.focus();
        passwordInput.style.borderColor = 'red';
        return;
    }

    const user = {
        username: input.value,
        password: passwordInput.value
    };
    let userLocalStorage = getUserFromLocalStorage();
    userLocalStorage.push(user);
    localStorage.setItem('user', JSON.stringify(userLocalStorage));
    form.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    if (localStorage.getItem('user')) {
        homePage.style.display = 'flex';
        modal.style.display = 'none';
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.length > 0) {
            updateNavbar(user[user.length - 1].username);
        }
    } else {
        modal.style.display = 'flex';
        homePage.style.display = 'none';
    }
});

quite && quite.addEventListener('click', function(event) {
    event.preventDefault();
    let isQuite = confirm("Rostdan ham chiqib ketmoqchimisiz?");
    if (isQuite) {
        modal.style.display = 'flex';
        homePage.style.display = 'none';
        localStorage.clear();
    }
});