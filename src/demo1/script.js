document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const output = fetch('https://jsonplaceholder.typicode.comx/users/1')
        .then((apiResult) => {
            console.log('Inside then() ', apiResult);
            return apiResult.json();
        })
        .catch((error) => {
            console.log('Inside catch() ', error);
        })
        .finally(() => {
            console.log('Inside finally()');
        });

    console.log('Output from Fetch(): ', output, 'Type Of: ', typeof output, 'Promise: ', output instanceof Promise);

    output.then((userRow) => {
        console.log('Output Received', userRow);

        if (userRow !== undefined) {
            const name = document.querySelector('#name');
            name.textContent = userRow.name;

            const email = document.querySelector('#email');
            email.textContent = userRow.email;
        }
    })
        .catch((error) => {
            console.log('Output Error', error);
        })
        .finally(() => {
            console.log('Output Finally');
        });

});