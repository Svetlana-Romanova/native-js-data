import CustomInfo from './data.js';

let table = document.querySelector('.table');
let btnAdd = document.querySelector('.customsList__btn--add');
let customAdd = document.querySelector('.customsList__add');

// Выбор малого/большого набора
document.addEventListener('click', function(event) {

    if (event.target.classList.contains('customsList__btn--small')) {
        document.querySelector('.customsList__load').style.display = 'block';
        table.classList.remove('table-hidden');

        fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
        .then((response) => {
            document.querySelector('.customsList__load').style.display = 'none';
            return response.json();
        }).then(data => data.forEach(element => {
            let CustomInfor = new CustomInfo(element);
            }));
    } else if (event.target.classList.contains('customsList__btn--big')) {
        document.querySelector('.customsList__load').style.display = 'block';
        table.classList.remove('table-hidden');

        fetch('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
        .then((response) => {
            document.querySelector('.customsList__load').style.display = 'none';
            return response.json();
        }).then(data => data.forEach(element => {
            let CustomInfor = new CustomInfo(element);
        }));
    }
});

// Форма добавления ряда 
function addNewCustomer() {
    return new Promise(function(resolve, reject) {
        btnAdd.addEventListener('click', function() {
            customAdd.childNodes.length < 4 ? resolve() : reject();
        });
    });
}

//создание мини-таблицы для добавления нового человека
function createTable() {
    btnAdd.style.display = 'none';
    let tableNew = document.createElement('table');
    tableNew.classList.add('table');
    tableNew.classList.add('table__small');
    tableNew.innerHTML = `
    <thead>
        <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
        </tr>
    </thead>
    <tbody>
        <tr class="table__inputs">
            <th>
                <input class="customsList__input" type="text">
            </th>
            <th>
                <input class="customsList__input" type="text">
            </th>
            <th>
                <input class="customsList__input" type="text">
            </th>
            <th>
                <input class="customsList__input" type="text">
            </th>
            <th>
                <input class="customsList__input" type="text">
            </th>
        </tr>
    </tbody>
    `;
    customAdd.append(tableNew);
}

// Проверка на заполненность всех input
function fillInputs() {
    document.addEventListener('input', function(event) {
        let inputs = document.querySelectorAll('.customsList__input');
        if (event.target.classList.contains('customsList__input')) {
            let arrayInputs = Array.from(inputs);
            if (arrayInputs.every(elemt => elemt.value.trim().length && customAdd.childNodes.length < 5)) {
                let btnAddInTable = document.createElement('button');
                btnAddInTable.classList.add('customsList__btn');
                btnAddInTable.innerHTML = 'Добавить в таблицу';
                btnAddInTable.style.margin = '0 auto';
                customAdd.prepend(btnAddInTable);

                // перемешение нового Custom в основную таблицу
                function moveNewCustom() {
                    let arr = [];
                    let inputs = document.querySelectorAll('.customsList__input');
                    inputs.forEach(function(el) {
                        arr.push(el.value);
                    });
                    table.classList.remove('table-hidden');
                    let Custom = {
                        id: 0,
                        firstName: 0,
                        lastName: 'Corson',
                        email: 'DWhalley@in.gov',
                        phone: '(612)211-6296',
                    };

                    let newCustom = Object.create(Custom);
                    newCustom.id = arr[0];
                    newCustom.firstName = arr[1];
                    newCustom.lastName = arr[2];
                    newCustom.email = arr[3];
                    newCustom.phone = arr[4];

                    let CustomInfor = new CustomInfo(newCustom);
                    let tableSmall = document.querySelector('.table__small');
                    tableSmall.remove();
                    btnAddInTable.remove();
                }

                btnAddInTable.addEventListener('click', moveNewCustom);
        } 
    }
});
}

addNewCustomer().then(createTable)
                .then(fillInputs)
                .catch(error => console.log('Error'));
