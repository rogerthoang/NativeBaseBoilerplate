import { observable, action } from 'mobx';
import agent from '../agent';

class UserStore {
  @observable allusers;
  @observable currentUser;
  @observable currentRoleId;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable loadingUsers;
  @observable selectedUserId = '';
  @observable gotSingleUser = false;
  @observable
  singleUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: { roleId: 'Admin' },
  };

  @observable
  newUserFields = {
    firstName: {
      isValid: '',
      error: '',
    },
    lastName: {
      isValid: '',
      error: '',
    },
    email: {
      isValid: '',
      error: '',
    },
    password: {
      isValid: '',
      error: '',
    },
    role: {
      isValid: '',
      error: '',
    },
  };

  @observable
  singleUserFields = {
    firstName: {
      isValid: '',
      error: '',
    },
    lastName: {
      isValid: '',
      error: '',
    },
    email: {
      isValid: '',
      error: '',
    },
    password: {
      isValid: '',
      error: '',
    },
    role: {
      isValid: '',
      error: '',
    },
  };

  @observable
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: {},
  };

  @action
  checkNewUserForm() {
    if (this.newUser.firstName !== '') {
      this.newUserFields.firstName.isValid = 'form-control is-valid';
      this.newUserFields.firstName.error = '';
    } else {
      this.newUserFields.firstName.isValid = 'form-control is-invalid';
      this.newUserFields.firstName.error = 'Field cannot be empty.';
    }

    if (this.newUser.lastName !== '') {
      this.newUserFields.lastName.isValid = 'form-control is-valid';
      this.newUserFields.lastName.error = '';
    } else {
      this.newUserFields.lastName.isValid = 'form-control is-invalid';
      this.newUserFields.lastName.error = 'Field cannot be empty.';
    }

    if (/^[A-z].+@[A-z].+\.[A-z].+$/.test(this.newUser.email)) {
      this.newUserFields.email.isValid = 'form-control is-valid';
      this.newUserFields.email.error = '';
    } else {
      this.newUserFields.email.isValid = 'form-control is-invalid';
      this.newUserFields.email.error = 'Enter a valid email. ex. user@domain.com';
    }

    if (this.newUser.password !== '') {
      this.newUserFields.password.isValid = 'form-control is-valid';
      this.newUserFields.password.error = '';
    } else {
      this.newUserFields.password.isValid = 'form-control is-invalid';
      this.newUserFields.password.error = 'Field cannot be empty.';
    }

    if (typeof this.newUser.role !== 'object') {
      this.newUserFields.role.isValid = 'form-control is-valid';
      this.newUserFields.role.error = '';
    } else {
      this.newUserFields.role.isValid = 'form-control is-invalid';
      this.newUserFields.role.error = 'Select a Role for this user.';
    }

    for (let key in this.newUserFields) {
      if (this.newUserFields[key].isValid === 'form-control is-invalid') return false;
    }

    return true;
  }

  @action
  checkSingleUserForm() {
    if (this.singleUser.firstName !== '') {
      this.singleUserFields.firstName.isValid = 'form-control is-valid';
      this.singleUserFields.firstName.error = '';
    } else {
      this.singleUserFields.firstName.isValid = 'form-control is-invalid';
      this.singleUserFields.firstName.error = 'Field cannot be empty.';
    }

    if (this.singleUser.lastName !== '') {
      this.singleUserFields.lastName.isValid = 'form-control is-valid';
      this.singleUserFields.lastName.error = '';
    } else {
      this.singleUserFields.lastName.isValid = 'form-control is-invalid';
      this.singleUserFields.lastName.error = 'Field cannot be empty.';
    }

    if (/^[A-z].+@[A-z].+\.[A-z].+$/.test(this.singleUser.email)) {
      this.singleUserFields.email.isValid = 'form-control is-valid';
      this.singleUserFields.email.error = '';
    } else {
      this.singleUserFields.email.isValid = 'form-control is-invalid';
      this.singleUserFields.email.error = 'Enter a valid email. ex. user@domain.com';
    }

    if (this.singleUser.password !== '') {
      this.singleUserFields.password.isValid = 'form-control is-valid';
      this.singleUserFields.password.error = '';
    } else {
      this.singleUserFields.password.isValid = 'form-control is-invalid';
      this.singleUserFields.password.error = 'Field cannot be empty.';
    }

    this.singleUserFields.role = 'form-control is-valid';

    for (let key in this.singleUserFields) {
      if (this.singleUserFields[key].isValid === 'form-control is-invalid') return false;
    }

    return true;
  }

  @action
  resetNewUserForm() {
    this.newUserFields = {
      firstName: {
        isValid: '',
        error: '',
      },
      lastName: {
        isValid: '',
        error: '',
      },
      email: {
        isValid: '',
        error: '',
      },
      password: {
        isValid: '',
        error: '',
      },
      role: {
        isValid: '',
        error: '',
      },
    };

    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: {},
    };
  }

  @action
  resetSingleUserForm() {
    this.singleUserFields = {
      firstName: {
        isValid: '',
        error: '',
      },
      lastName: {
        isValid: '',
        error: '',
      },
      email: {
        isValid: '',
        error: '',
      },
      password: {
        isValid: '',
        error: '',
      },
      role: {
        isValid: '',
        error: '',
      },
    };

    this.singleUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: { roleId: 'Admin' },
    };
  }

  @action
  getSingleUser() {
    this.gotSingleUser = false;
    return agent.Users
      .getSingleUser(this.selectedUserId)
      .then(
        action(({ user }) => {
          this.resetSingleUser();
          this.singleUser = user;
        }),
      )
      .finally(
        action(() => {
          this.gotSingleUser = true;
        }),
      );
  }

  @action
  pullAllUser() {
    this.loadingUsers = true;
    return agent.Users
      .getAll()
      .then(
        action(({ users }) => {
          this.allusers = users;
        }),
      )
      .finally(
        action(() => {
          this.loadingUsers = false;
        }),
      );
  }

  @action
  pullUser() {
    this.loadingUser = true;
    return agent.Auth
      .current()
      .then(
        action(({ user }) => {
          this.currentUser = user;
        }),
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        }),
      );
  }

  @action
  createNewUser() {
    return agent.Users
      .createNewUser({ user: this.newUser })
      .then(() => {
        agent.Users.getAll().then(
          action(({ users }) => {
            this.allusers = users;
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action
  updateUser(newUser) {
    this.updatingUser = true;
    return agent.Auth
      .save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        }),
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        }),
      );
  }

  @action
  updateSingleUser() {
    this.updatingUser = true;
    return agent.Users
      .updateSingleUser({ user: this.singleUser })
      .then(() => {
        agent.Users.getAll().then(
          action(({ users }) => {
            this.allusers = users;
          }),
        );
      })
      .catch(err => {
        console.log(err);
      })
      .finally(
        action(() => {
          this.updatingUser = false;
          this.singleUser.password = '';
        }),
      );
  }

  @action
  deleteUser() {
    this.updatingUser = true;
    return agent.Users
      .deleteSingleUser(this.selectedUserId)
      .then(() => {
        return agent.Users.getAll().then(
          action(({ users }) => {
            this.allusers = users;
          }),
        );
      })
      .catch(err => {
        console.log(err);
      })
      .finally(
        action(action => {
          this.updatingUser = false;
        }),
      );
  }

  @action
  forgetUser() {
    this.currentUser = undefined;
  }

  @action
  resetNewUser() {
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: {},
    };
    this.newUserFields = {
      firstName: {
        isValid: '',
        error: '',
      },
      lastName: {
        isValid: '',
        error: '',
      },
      email: {
        isValid: '',
        error: '',
      },
      password: {
        isValid: '',
        error: '',
      },
      role: {
        isValid: '',
        error: '',
      },
    };
  }

  @action
  resetSingleUser() {
    this.singleUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: { roleId: 'Admin' },
    };
    this.singleUserFields = {
      firstName: {
        isValid: '',
        error: '',
      },
      lastName: {
        isValid: '',
        error: '',
      },
      email: {
        isValid: '',
        error: '',
      },
      password: {
        isValid: '',
        error: '',
      },
      role: {
        isValid: '',
        error: '',
      },
    };
  }
}

export default new UserStore();
