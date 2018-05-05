import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';

// Subcomponents
import CharsList from './chars-list';
import CharEditorModal from './char-editor-modal';

// Stores
import CharsStore from '../../../stores/chars.js';

const store = CharsStore();

export default class CharPage extends Component {
  onSave(e) {
    e.preventDefault();

    if (store.new.id) {
      store.update();
    } else {
      store.save();
    }

    store.reset();

    $('#charEditorModal').modal('hide');
  }

  componentDidMount() {
    store.load();
  }

  render() {
    return (
      <Provider store={ store }>
        <section class="container-fluid">
          <Header title="Chars Editor" description="Here you can add, remove and edit chars">
            <button
              data-target="#charEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </Header>
          <CharsList />
          <CharEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
