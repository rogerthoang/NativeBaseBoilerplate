import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const env = process.env.NODE_ENV || 'development';

let API_ROOT =
  env === 'production' ? 'https://management.opuslineusa.com/api' : 'http://localhost:6565/api';

const encode = encodeURIComponent;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set('authorization', `Token ${commonStore.token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).end(handleErrors).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).end(handleErrors).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).end(handleErrors).then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {
      user: {
        email,
        password,
      },
    }),
  register: (username, email, password) =>
    requests.post('/users', {
      user: {
        email,
        password,
      },
    }),
  save: user => requests.put('/user', { user }),
};

const Users = {
  getAll: () => requests.get('/users'),
  createNewUser: newUser => requests.post('/users', newUser),
  getSingleUser: id => requests.get(`/users/byId/${id}`),
  updateSingleUser: user => requests.put('/users/edituser', user),
  deleteSingleUser: id => requests.del(`/users/remove/${id}`),
};

const Profile = {
  current: () => requests.get('/user'),
  updatePassword: password =>
    requests.put('/user', {
      user: {
        password,
      },
    }),
};

const Orders = {
  getAllNew: () => requests.get('/orders/type/new'),
  getAllProduction: () => requests.get('/orders/type/production'),
  getSingleByOrderId: id => requests.get(`/orders/id/${id}`),
  getSingleByPurchaseOrderId: id => requests.get(`/orders/po/${id}`),
  createOrder: newOrder => requests.post('/orders/create', newOrder),
  updateOrder: order => requests.put('/orders/update', order),
  deleteOrder: id => requests.del(`/orders/delete/${id}`),
  emailNewOrder: id => requests.post(`/orders/email/new-status/${id}`),
  emailProductionOrder: id => requests.post(`/orders/email/update-to-production/${id}`),
  emailApprovalReminder: id => requests.post(`/orders/email/approval-reminder/${id}`),
  emailPaymentReminder: id => requests.post(`/orders/email/payment-reminder/${id}`),
  submitPayment: (nameOnCard, cardType, cardNbr, expDate, secPin, id) =>
    requests.put(`/orders/pay/${id}`, {
      payment: {
        nameOnCard,
        cardType,
        cardNbr,
        expDate,
        secPin,
        id,
      },
    }),
  approveProof: (bool, id) =>
    requests.put(`/orders/approve/${id}`, {
      approve: {
        bool,
      },
    }),
};

const Mails = {
  getAll: () => requests.get('/mails'),
  getById: id => requests.get(`/mails/id/${id}`),
};

const Items = {
  getAll: () => requests.get('/items'),
  getByItemNbr: itemNbr => requests.get(`/items/sku/${itemNbr}`),
  createNewItem: newItem => requests.post('/items/create', newItem),
};

const Stats = {
  get: () => requests.get('/kpi'),
};

export default {
  Auth,
  Items,
  Orders,
  Mails,
  Profile,
  Stats,
  Users,
};
