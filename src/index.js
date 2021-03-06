// import 'normalize.css';

import './style.scss';
import 'materialize-css/dist/js/materialize.min';


if (document.readyState !== 'loading')
    init();
else
    document.addEventListener('DOMContentLoaded', init);

function init() {

    document.querySelector('form').addEventListener('submit', handleSubmit);

    const policyNode = document.querySelector('#policy');
    policyNode.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val || !val.length) {
            return;
        }

        const test = val.toLowerCase() == 'yes pineapple';
        e.target.classList.toggle('valid', test);
        e.target.classList.toggle('invalid', !test);
    });
}

const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm())
        return;

    const formNode = document.querySelector('#form');
    let formData = new FormData(formNode);
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }).then(() => {
        console.log('Form successfully submitted');
        document.querySelector("#input").innerHTML = `<p>Thank you! Your commission request was submitted.</p>
        <p>Once your commission is accepted, I will email you with my paypal information. You should have received a confirmation email at the address provided as well.</p>`;
    }).catch((error) => alert(error));
}

function validateForm() {
    return document.querySelector('#policy').value.toLowerCase() == 'yes pineapple';
}