import { connect } from 'parket/preact';
import { Component } from 'preact';

import Modal from '../../components/modal';

@connect
export default class CharEditorModal extends Component {
  render ({ store, onChange, onCreate }) {
    return (
      <Modal id="charEditorModal" title="Add a new char">
        <div class="modal-body">
          <form id="newCharForm">
            <div class={ 'border-bottom mb-3 py-1 ' + (store.new.points !== 20 && 'text-danger') }>
              Available points: { 20 - store.new.points }
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-3">
                HP: <input class="form-control" onInput={ (e) => store.setStat('hp', e.target.value) } type="number" value={ store.new.stats.hp } />
              </div>
              <div class="form-group col-sm-3">
                SP: <input class="form-control" onInput={ (e) => store.setStat('sp', e.target.value) } type="number" value={ store.new.stats.sp } />
              </div>
              <div class="form-group col-sm-4">
                STR: <input class="form-control" onInput={ (e) => store.setStat('str', e.target.value) } type="number" value={ store.new.stats.str } />
              </div>
              <div class="form-group col-sm-4">
                DEX: <input class="form-control" onInput={ (e) => store.setStat('def', e.target.value) } type="number" value={ store.new.stats.def } />
              </div>
              <div class="form-group col-sm-4">
                WIS: <input class="form-control" onInput={ (e) => store.setStat('int', e.target.value) } type="number" value={ store.new.stats.int } />
              </div>
              <div class="form-group col">
                <div class="btn-group btn-group-toggle">
                  <label class={ "btn btn-secondary " + (store.new.race === 0 ? "active": "") }>
                    <input type="radio" onChange={ () => store.setRace(0) } /> Archer
                  </label>
                  <label class={ "btn btn-secondary " + (store.new.race === 1 ? "active": "") }>
                    <input type="radio" onChange={ () => store.setRace(1) } /> Knight
                  </label>
                  <label class={ "btn btn-secondary " + (store.new.race === 2 ? "active": "") }>
                    <input type="radio" onChange={ () => store.setRace(2) } /> Mage
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onClick={ onCreate } disabled={ store.new.points !== 20 } >Save changes</button>
        </div>
      </Modal>
    );
  }
}
