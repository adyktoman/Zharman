import { connect } from 'parket/preact';
import { Component } from 'preact';

import Modal from '../../components/modal';

@connect

export default class UserEditorModal extends Component {
  render ({ store, onSave }) {
    return (
      <Modal id="userEditorModal" title="Add a new User">
        <div class="modal-body">
          <form id="newUserForm">
            <div class="form-row">
              <div className="form-group col-sm-6">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Name Unknown"/>
              </div>
              <div className="form-group col-sm-6">
                Nickname: <input class="form-control" required autofocus onInput={ (e) => store.setNickname(e.target.value) } type="text" value={ store.new.nickname } placeholder="Nickname Unknown"/>
              </div>
              <div className="form-group col-sm-6">
                Email: <input class="form-control" required onInput={ (e) => store.setEmail(e.target.value) } type="text" value={ store.new.email } placeholder="Email Unknown"/>
              </div>
              <div className="form-group col-sm-6">
                Password: <input class="form-control" required onInput={ (e) => store.setPassword(e.target.value) } type="password" value={ store.new.password } placeholder="Password"/>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secundary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" onClick={ onSave } disabled={ store.new.name.length <4 }>
            { store.new.id? 'Update': 'Save' }
          </button>
        </div>
      </Modal>
    )
  }
}
