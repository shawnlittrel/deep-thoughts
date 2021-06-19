import decode from 'jwt-decode';

class AuthService {
     //retrieve saved data in token
     getProfile() {
          return decode(this.getToken());
     }

     //check if user is still logged in
     loggedIn() {
          // check if there is a saved token and whether it is valid
          const token = this.getToken();
          //use type coersion to check if token is NOT undefined and the token is NOT expired
          return !!token && !this.isTokenExpired(token);
     }

     //check if token has expired
     isTokenExpired(token) {
          try {
               const decoded = decode(token);
               if (decoded.exp < Date.now() / 1000) {
                    return true;
               } else {
                    return false;
               }
          } catch (err) {
               return false;
          }
     }

     //retrieve token from localStorage
     getToken() {
          return localStorage.getItem('id_token');
     }

     //set token to localStorage and reload page to homepage
     login(idToken) {
          //Save user token to localStorage
          localStorage.setItem('id_token', idToken);

          window.location.assign('/');
     }

     //clear token from localStorage and force logout with reload
     logout() {
          //clear user token and porfile data from localStorage
          localStorage.removeItem('id_token');
          //reload page and reset state of app
          window.location.assign('/');
     }
};

export default new AuthService();