import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';

// Stores
import UsersStore from '../../../stores/users.js';

// Subcomponents
import UserList from './users-list';
import UserEditorModal from './user-editor-modal';
import {Toaster} from '../../components/toast';

const store = UsersStore();

export default class UserPage extends Component {
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
      $('#userEditorModal').modal('hide');
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
            description="Here you can add, remove and edit Users"
            icon="shield"
            title="User Editor" >
            <button
              data-target="#userEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW
            </button>
          </Header>
          <UserList />
          <UserEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
