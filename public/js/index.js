const confirmPass = (event) => {
    const cnfToast = document.getElementById('cnf-password-toast')
    const password = document.getElementById('password')
    const cnfPassword = document.getElementById('confirm-password')
    const form = document.getElementById('login-form')

    console.log(cnfPassword.value);

    if (password.value === cnfPassword.value) {
        cnfToast.style.display = 'none'
        form.setAttribute('method', 'post')
        form.setAttribute('action', '/register')
    } else {
        cnfToast.style.display = 'block'
        form.setAttribute('method', 'get')
        form.setAttribute('action', '/')
    }
}

const handleClick = (event) => {
    const form = document.getElementById('login-form')
    const loginBtn = document.getElementById('login-btn')
    const registerBtn = document.getElementById('register-btn')
    const lgBtn = document.querySelector('.login-btn')
    const cnfPass = document.getElementById('cnf-pass')

    if (event.innerText === 'Login') {
        cnfPass.style.display = 'none'
        form.setAttribute('action', '/login')
        lgBtn.innerText = 'Login'
        registerBtn.style.backgroundColor = 'azure'
        loginBtn.style.backgroundColor = '#517cb4'

    } else {
        cnfPass.style.display = 'flex'
        form.setAttribute('action', '/register')
        lgBtn.innerText = 'Register'
        registerBtn.style.background = '#517cb4'
        loginBtn.style.background = 'azure'
    }
}

const viewListNames = () => {
    const list = document.querySelector('.right-section')
    const logoutBtn = document.querySelector('.nav-item')
    list.classList.toggle('hide')
    logoutBtn.classList.toggle('hide')
}
