import model from 'parket';

const UsersStore = model('UsersStore', {
  initial: () => ({
    list: [],
    new: {
      email: '',
      level: 0,
      name: 'Unnamed'
    }
  }),
  actions: state => ({
    save() {
      state.list.push(state.new);
    },
    reset() {
      state.new = {
        email: '',
        level: 0,
        name: 'Unnamed'
      }
    },
    remove(user) {
      state.list = state.list.filter(current => current.name !== user.name)
    },
    setName (name) {
      state.new.name = name;
    },
    setRace(index) {
      state.new.race = index
    }
  })
});

export default UsersStore;
