export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector),
        this._info = document.querySelector(infoSelector),
        this._ava = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            info: this._info.textContent,
            ava: this._ava.src
        }
        return data
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.about;
        this._ava.src = data.avatar;
    }
}