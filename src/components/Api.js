export class Api {
    constructor({address, token, cohort}) {
        this._address = address;
        this._token = token;
        this._cohort = cohort;
    }
  
    getInitialCards() {
        return fetch(`${this._address}/${this._cohort}/cards`, 
        {
            headers: {
              authorization: this._token
            }
        })
        .then(res => {
              if (res.ok) {
                  return res.json();
              }
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        });
    }

    addCard(data) {
      return fetch(`${this._address}/${this._cohort}/cards`, {
          method: 'POST',
          headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: data.name,
              link: data.link
          }),
      })
      .then(res => {
          if(res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
          })
    }

    getUserInfo() {
      return fetch(`${this._address}/${this._cohort}/users/me`, 
      {
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
      })
      .then(res => {
            if (res.ok) {
                return res.json();
            }
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });
    }
    
    setUserInfo(name, info) {
      return fetch(`${this._address}/${this._cohort}/users/me`, 
      {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            about: info
          })
      })
      .then(res => {
            if (res.ok) {
                return res.json();
            }
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });
    }

    setUserAva(data) {
      return fetch(`${this._address}/${this._cohort}/users/me/avatar`, 
      {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: data
          })
      })
      .then(res => {
            if (res.ok) {
                return res.json();
            }
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });
    }
}