import axios from 'axios';
import model from 'parket';

const API_URI = process.env.PREACT_APP_API + '/chars';

const CharsStore = model('CharsStore', {
  initial: () => ({
    list: [],
    new: {
      name: 'Unnamed',
      points: 20,
      race: 0, // 0: Archer, 1: Knight, 2: Mage
      stats: {
        hp: 4,
        sp: 4,
        str: 4,
        def: 4,
        int: 4
      }
    },
    loading: true
  }),
  actions: state => ({
    load() {
      state.loading = true;
      axios
        .get(API_URI)
        .then(res => {
          state.list = res.data;
          state.loading = false;
          state.reset();
        })
    },
    reset() {
      state.new = {
        name: 'Unnamed',
        points: 20,
        race: 0,
        stats: {
          hp: 4,
          sp: 4,
          str: 4,
          def: 4,
          int: 4
        }
      }
    },
    remove(char, callback) {
      state.loading = true;
      axios
        .delete(API_URI + '/' + char.id)
        .then(response => {
            state.load();
            callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
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
    select(char) {
      state.new.name = char.name;
      state.new.id = char.id;
      state.new.stats = char.stats;
      state.new.points = char.points;
    },
    setName (name) {
      state.new.name = name;
    },
    setRace(index) {
      state.new.race = index
    },
    setStat(stat, value) {
      state.new.stats[stat] = parseInt(value, 10) | 0;
      state.new.points =
        state.new.stats.hp + state.new.stats.sp +
        state.new.stats.str + state.new.stats.def + state.new.stats.int;
    }
  })
});

export default CharsStore;
