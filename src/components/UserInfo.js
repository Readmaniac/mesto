export class UserInfo{
  constructor(nameSelector, jobSelector, avatarSelector){
    this._nameField = document.querySelector(nameSelector);
    this._jobField = document.querySelector(jobSelector);
    this._avatarField = document.querySelector(avatarSelector);
  }

  getUserInfo(){
    return {
      name: this._nameField.textContent, 
      link: this._jobField.textContent,
      avatar: this._avatarField.src
    }
  }

  setUserInfo(data){
    this._nameField.textContent = data.name;
    this._jobField.textContent = data.about;
    this._avatarField.src = data.avatar;
  }

  setAvatar(data){
    this._avatarField.src = data.avatar;
  }
}