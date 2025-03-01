'use strict';

const navButtonB = document.querySelector('.navbar .fa-bars');
const navButtonX = document.querySelector('.navbar .fa-x');
const navMenu = document.querySelector('nav ul');
const nav = document.querySelector('.nav');
const backOpen = document.querySelector('.background-opacity-nav-open');

navButtonB.addEventListener('click', () => {
        nav.classList.add('show-nav');
        navMenu.classList.add('show');
        navMenu.classList.add('show-menu-responsive');
        navButtonB.classList.add('not-show');
        navButtonX.classList.remove('not-show');
        backOpen.classList.remove('not-show');
});

navButtonX.addEventListener('click', () => {
    console.log(navMenu.className);
    if (navMenu.className = 'show') {
        nav.classList.remove('show-nav');
        navMenu.classList.remove('show');
        navMenu.classList.remove('show-menu-responsive');
        navButtonB.classList.remove('not-show');
        navButtonX.classList.add('not-show');
        backOpen.classList.add('not-show');
    }
});

navMenu.addEventListener('click', () => {
    if (navMenu.className = 'show') {
        nav.classList.remove('show-nav');
        navMenu.classList.remove('show');
        navButtonB.classList.remove('not-show');
        navButtonX.classList.add('not-show');
        backOpen.classList.add('not-show');
    }
});

//Contact-me form

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { fname, lname, contactEmail, contactPhone, comment } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: 'your_gmail_username@gmail.com', // Replace with your email
            pass: 'your_gmail_password' // Replace with your password or app password
        }
    });

    const mailOptions = {
        from: 'your_gmail_username@gmail.com',
        to: 'brandsclinic24@gmail.com',
        subject: 'Contact Form Submission',
        text: `
            First Name: ${fname}
            Last Name: ${lname}
            Email: ${contactEmail}
            Phone: ${contactPhone}
            Message: ${comment}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});