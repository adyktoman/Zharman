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
    save() {
      state.list.push(state.new);
    },
    update() {
      state.list.map(char => {
        if (char.name === state.new.name ) {
          char = state.new;
        }
      });
    },
    select(char) {
      state.new.name = char.name;
      state.new.id = 1;
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
