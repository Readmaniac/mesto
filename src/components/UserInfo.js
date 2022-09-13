export class UserInfo{
    constructor(nameSelector, jobSelector){
        this._nameField = document.querySelector(nameSelector);
        this._jobField = document.querySelector(jobSelector);
    }

    getUserInfo(){
        return {name: this._nameField.textContent, job: this._jobField.textContent}
    }

    setUserInfo({name, link}){
        this._nameField.textContent = name;
        this._jobField.textContent = link;
    }
}