import axios from 'axios';
import model from 'parket';

const API_URI = process.env.PREACT_APP_API + '/users';

const UsersStore = model('UsersStore', {
  initial: () => ({
    list: [],
    new: {
      email: '',
      level: 0,
      name: '',
      nickname: '',
      password: ''
    }
  }),
  actions: state => ({
    load() {
      state.loading = true;
      axios
        .get(API_URI)
        .then(response => {
          state.list = response.data;
          state.loading = false;
        })
    },
    save(callback) {
      state.loading = true;
      axios
        .post(API_URI, state.new)
        .then((response) => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    reset() {
      state.new = {
        email: '',
        level: 0,
        name: '',
        nickname: '',
        password: ''
      }
    },
    remove(user, callback) {
      state.loading = true;
      axios
        .delete(API_URI + '/' + user.id)
        .then(response => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    update(callback) {
      state.loading = true;
      axios
        .put(API_URI + '/' + state.new.id, state.new)
        .then((response) => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    select(user) {
      state.new.id = user.id;
      state.new.name = user.name;
      state.new.email = user.email;
      state.new.nickname = user.nickname;
      state.new.level = user.level;
    },
    setName (name) {
      state.new.name = name;
    },
    setNickname (nickname) {
      state.new.nickname = nickname;
    },
    setEmail (email) {
      state.new.email = email;
    },
    setLevel (level) {
      state.new.level = level;
    },
    setPassword (password) {
      state.new.password = password;
    },
  })
});

export default UsersStore;
