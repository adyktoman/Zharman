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

const store = UsersStore();

export default class UserPage extends Component {
  onSave(e) {
    e.preventDefault();

    if (store.new.id) {
      store.update();
    } else {
      store.save();
    }

    store.reset();

    $('#userEditorModal').modal('hide');
  }

  componentDidMount() {
    store.load();
  }

  render() {
    return (
      <Provider store={ store }>
        <section class="container-fluid">
          <Header title="User Editor" description="Here you can add, remove and edit Users">
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
