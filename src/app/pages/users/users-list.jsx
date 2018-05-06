import { Component } from 'preact';
import { connect } from 'parket/preact';

// Shared components
import { Toaster } from '../../components/toast';
import Table from '../../components/table';

@connect
export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { label: 'Name', content: this.renderNameColumn.bind(this) },
      { label: 'Nickname', content: (user) => user.nickname },
      { label: 'Email', content: (user) => user.email },
      { label: 'Level', content: (user) => user.level },
      { label: '', content: this.renderActionsColumn.bind(this) }
    ];
  }

  onRemove(response) {
    if (response.status === 200 && response.data) {
      Toaster.success('top', 'Successfully removed ' + this.props.store.new.name);
    } else {
      Toaster.error('top', 'Error while removing ' + this.props.store.new.name);
    }
  }

  renderActionsColumn(user) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(user, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(user) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#userEditorModal"
        onClick={ () => { this.props.store.select(user) } }>{ user.name }</span>
    )
  }

  render({ store }) {
    return (
      <Table
        cols={ this.columns }
        data={ store.list }
        footer={ `Total: ${ store.list.length }` }
        loading={ store.loading } />
    );
  }
}
