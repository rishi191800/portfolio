const faMusic = document.querySelector('.fa-music');
const bars = document.querySelector('.bars');
const times = document.querySelector('.times');
const on = document.querySelector('#on');
const off = document.querySelector('#off');
const audio = document.querySelector('#audio');
const sidebar = document.querySelector('.sidebar');
const year = document.getElementById('year');
const header = document.querySelector('.header');
const body = document.getElementsByTagName('body');
const scrollDown1 = document.querySelector('.scroll-down1');
const scrollDown2 = document.querySelector('.scroll-down2');
const name = document.querySelector('.name');
const email = document.querySelector('.email');
const subject = document.querySelector('.subject');
const textarea = document.querySelector('.textarea');
const contactForm = document.querySelector('.contact-form');
const message = document.querySelector('.message');

off.addEventListener('click', () => soundTrack('off'));
on.addEventListener('click', () => soundTrack('on'));

const soundTrack = (soundState) => {
    if (soundState === 'off') {
        on.style.display = 'block';
        off.style.display = 'none';
        faMusic.style.color = '#08fdd8'
        audio.play();
    }
    else {
        off.style.display = 'block';
        on.style.display = 'none';
        faMusic.style.color = '#f50057';
        audio.pause();
    }
}

bars.addEventListener('click', () => menuToggle('open'));
times.addEventListener('click', () => menuToggle('close'));

const menuToggle = (x) => {
    if (x === 'open') {
        sidebar.classList.add('show-sidebar');
        times.style.display = 'block';
        bars.style.display = 'none';
    }
    else if (x === 'close') {
        sidebar.classList.remove('show-sidebar');
        bars.style.display = 'block';
        times.style.display = 'none';
    }
}

const date = new Date();
const finalDate = date.getFullYear();

year.innerHTML = `${finalDate} SaraRishi.com`;


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-border');
        scrollDown1.style.display = 'none';
        scrollDown2.style.display = 'none';
    }
    else {
        header.classList.remove('header-border');
        scrollDown1.style.display = 'block';
        scrollDown2.style.display = 'block';
    }
})

// JQuery 

$(document).ready(function () {
    if (!$('#canvas').tagcanvas({
        textColour: 'cyan',
        outlineColour: 'transparent',
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        weight: true
    }, "move")) {
        // if somthing went wrong hide the canvas 
        $('#canvas-container')
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInput();
})

const validateInput = () => {
    let vemail = email.value;
    let vtextarea = textarea.value;
    let vname = name.value;

    if (!vemail && !vtextarea && !vname) {
        setError(email.parentElement);
        setError(textarea.parentElement);
        setError(name.parentElement);
        showMessage('Please fill the name, email and message')
    }
    else if (!vemail && vtextarea && vname) {
        setError(email.parentElement);
        showMessage("Email can't be Empty");
    }
    else if (!vtextarea && vemail && vname) {
        setError(textarea.parentElement);
        showMessage('Enter Message to send');
    }
    else if (!vname && vtextarea && vemail) {
        setError(name.parentElement);
        showMessage("Name can't be Empty");
    }
    else if (vemail && vtextarea && vname) {
        emailjs.sendForm('raa@1811', 'raa@1811_template', contactForm, 'Q0thRybKhI0qHSDRA');
        setSuccess(textarea.parentElement);
        setSuccess(email.parentElement);
        setSuccess(name.parentElement);
        showMessage("Message Sent Successfully", 'green');
        name.value ='';
        email.value = '';
        textarea.value = '';
        subject.value = '';
    }
}

const setError = (input) => {
    if (input.classList.contains("success")) {
        input.classList.remove('success');
    }
    else {
        input.classList.add('error');
    }
}

const setSuccess = (input) => {
    if (input.classList.contains('error')) {
        input.classList.remove('error');
    }
    else {
        input.classList.add('success');
    }
}

const showMessage = (messageItem, updateColor) => {
    const divContent = document.createElement('div');
    divContent.innerHTML = messageItem;
    divContent.classList.add('message-content');
    divContent.style.background = updateColor;
    message.prepend(divContent);
    message.style.transform = `translate(${(0, 0)}%)`
    setTimeout(() => {
        message.classList.add('message-content-hide');
        divContent.addEventListener('transitionend', () => {
            divContent.remove();

        })
    }, 2500);
}