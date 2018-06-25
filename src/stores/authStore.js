// import { observable, action } from 'mobx';
// import agent from '../service/index';
// import userStore from './userStore';
// import commonStore from './commonStore';
// import jwtDecode from 'jwt-decode';

// class AuthStore {
//   /* constructor */
//   constructor() { }

//   /* observables */
//   @observable inProgress = false;
//   @observable errors = undefined;
//   @observable errorMessage = '';
//   @observable
//   values = {
//     email: '',
//     password: '',
//     confirmpassword: '',
//   };

//   decodeJwt = token => {
//     if (token) return jwtDecode(token);
//   };

//   /* action : strict */
//   @action
//   setEmail(email) {
//     this.values.email = email;
//   }

//   @action
//   setPassword(password) {
//     this.values.password = password;
//   }

//   @action
//   setConfirmPassword(confirmpassword) {
//     this.values.confirmpassword = confirmpassword;
//   }

//   @action
//   setErrorMessage() {
//     if (typeof this.errors !== 'undefined')
//       this.errorMessage = Object.keys(this.errors) + ' ' + Object.values(this.errors);
//   }

//   @action
//   reset() {
//     this.values.username = '';
//     this.values.email = '';
//     this.values.password = '';
//     this.value.confirmpassword = '';
//   }

//   @action
//   login() {
//     this.inProgress = true;
//     this.errors = undefined;
//     return agent.Auth
//       .login(this.values.email, this.values.password)
//       .then(({ user }) => commonStore.setToken(user.token))
//       .then(() => userStore.pullUser())
//       .catch(
//         action(err => {
//           throw err;
//         }),
//     )
//       .finally(
//         action(() => {
//           this.inProgress = false;
//         }),
//     );
//   }

//   @action
//   register() {
//     this.inProgress = true;
//     this.errors = undefined;
//     return agent.Auth
//       .register(this.values.username, this.values.email, this.values.password)
//       .then(({ user }) => commonStore.setToken(user.token))
//       .then(() => userStore.pullUser())
//       .catch(
//         action(err => {
//           throw err;
//         }),
//     )
//       .finally(
//         action(() => {
//           this.inProgress = false;
//         }),
//     );
//   }

//   @action
//   logout() {
//     commonStore.setToken(undefined);
//     userStore.forgetUser();
//     return new Promise(res => res());
//   }
// }

// export default new AuthStore();
