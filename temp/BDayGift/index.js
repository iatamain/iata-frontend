document.addEventListener('DOMContentLoaded', () => {
    const message_p1 = document.getElementById('message_p1');
    const message_p2 = document.getElementById('message_p2');
    const button = document.getElementById('button');
    const status_hr = document.getElementById('status_hr');

    let data = null;
    try {
        const url = new URL(window.location.href);
        data = JSON.parse(atob(url.searchParams.get('q')));
        setTimeout(() => status_hr.classList.add('ok'), 200);
    }
    catch {
        message_p1.innerText = 'Something went wrong';
        setTimeout(() => status_hr.classList.add('error'), 200);
        button.remove();
    }

    if (data) {
        message_p1.innerText = data.p1;
        message_p2.innerText = data.p2;
        button.innerText = data.b;
        button.setAttribute('href', data.url);
    }
});