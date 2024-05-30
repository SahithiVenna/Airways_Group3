export default class LoginModelClass {
    id = '';
    password = '';
    first_Name = '';
    last_Name = '';
    gender = '';
    contact = '';

    constructor(id, first_Name, last_Name, gender, contact, password) {
        this.id = id;
        this.password = password;
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.gender = gender;
        this.contact = contact;

    }
}