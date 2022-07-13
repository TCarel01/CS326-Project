import { crudObj } from "./crud.js";
import { dataReader } from "./data reader.js";

let loginReader = new dataReader();
let loginCrud = new crudObj(loginReader);

const registerButton = document.getElementById('register');

registerButton.addEventListener('click', function (event) {
    loginCrud.saveTimeSheet(document.getElementById('username').value,  
                            document.getElementById('password').value);
});