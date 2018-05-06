import axios from 'axios';
import model from 'parket';

const API_URI = process.env.PREACT_APP_API + '/users';

const UsersStore = model('UsersStore', {
  initial: () => ({
    list: [],
    new: {
      email: '',
      level: 0,
      name: 'Unnamed',
      nickname: 'Unnamed'
    }
  }),
  actions: state => ({
    load() {
      state.loading = true;
      axios
        .get(API_URI)
        .then(res => {
          state.list = res.data;
          state.loading = false;
        })
    },
    save() {
      state.loading = true;
      axios
        .post(API_URI, state.new)
        .then(() => {
          state.load()
        });
    },
    reset() {
      state.new = {
        email: '',
        level: 0,
        name: 'Unnamed'
      }
    },
    remove(user) {
      state.loading = true;
      axios
        .delete(API_URI + '/' + user.id)
        .then(() => {
          state.load();
        });
    },
    update() {
      state.loading = true;
      axios
        .put(API_URI + '/' + state.new.id, state.new)
        .then(() => {
          state.load()
        });
    },
    select(user) {
      state.new.name = user.name;
      state.new.email = user.email;
      state.new.nickname = user.nickname;
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
    setGender (gender) {
      state.new.gender = gender;
    },
    setPassword (password) {
      state.new.password = password;
    },
  })
});

export default UsersStore;
