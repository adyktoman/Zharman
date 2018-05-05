import axios from 'axios';
import model from 'parket';

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
        .get('http://localhost:9002/chars')
        .then(res => {
          state.list = res.data;
          state.loading = false;
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
    remove(char) {
      state.loading = true;
      axios
        .delete('http://localhost:9002/chars/' + char.id)
        .then(res => {
            state.load();
        })
    },
    save() {
      state.loading = true;
      axios
        .post('http://localhost:9002/chars', state.new)
        .then(() => {
          state.load()
        });
    },
    update() {
      state.loading = true;
      axios
        .put('http://localhost:9002/chars/' + state.new.id, state.new)
        .then(() => {
          state.load()
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
