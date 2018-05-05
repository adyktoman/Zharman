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
    }
  }),
  actions: state => ({
    save() {
      state.list.push(state.new);
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
      state.list = state.list.filter(current => current.name !== char.name)
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
