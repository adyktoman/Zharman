import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';
import { Toaster } from '../../components/toast';

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
      store.update(this.onSaveDone.bind(this));
    } else {
      store.save(this.onSaveDone.bind(this));
    }
  }

  onSaveDone(response) {
    if (response.status === 200 && response.data) {
      Toaster.success('top', 'Successfully saved ' + store.new.name);
      $('#charEditorModal').modal('hide');
    } else {
      Toaster.error('top', 'Error while saving ' + store.new.name);
    }
  }

  componentDidMount() {
    store.load();
  }

  render() {
    return (
      <Provider store={ store }>
        <section class="container-fluid">
          <Header
            description="Here you can add, remove and edit chars"
            icon="snowman"
            title="Chars Editor" >
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
