export default class CustomInfo {

    constructor(custom) {
        this.id = custom.id;
        this.firstName = custom.firstName;
        this.lastName = custom.lastName;
        this.email = custom.email;
        this.phone = custom.phone;
        this.elem = this.render();

    }

    render() {
        let el = document.createElement('tr');
        el.classList.add('table__string');
        el.innerHTML = `
            <td>${this.id}</td>
            <td>${this.firstName}</td>
            <td>${this.lastName}</td>
            <td>${this.email}</td>
            <td>${this.phone}</td>
        `;
        let tableBody = document.querySelector('.table__tbody');
        tableBody.prepend(el);

    }
}  