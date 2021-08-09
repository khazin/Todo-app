const checkboxAdd = document.querySelector('#checkboxAdd');
const checkbox = document.querySelector('.checkbox__box');

document.addEventListener('click', (e) => {
    let element = e.target;
    if (element.classList.contains('checkbox__box')) {
        console.log(element);
        checkbox.classList.toggle('checked');
    }
})