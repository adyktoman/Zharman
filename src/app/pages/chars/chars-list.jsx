import { Component } from 'preact';
import { connect } from 'parket/preact';

const RACES = [ 'Archer', 'Knight', 'Mage' ];

@connect
export default class CharsList extends Component {
  render({ store }) {
    return (
      <table class="table table-sm table-hover">
        <thead>
          <tr class="bg-dark text-white">
            <th>Name</th>
            <th>HP</th>
            <th>SP</th>
            <th>STR</th>
            <th>DEF</th>
            <th>INT</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            store.loading === false && store.list && store.list.map( char => (
              <tr>
                <td
                  class="btn text-primary"
                  data-toggle="modal"
                  data-target="#charEditorModal"
                  onClick={ () => { store.select(char) } }
                  >
                  { char.name } ({ RACES[char.race] })</td>
                <td>{ char.stats.hp }</td>
                <td>{ char.stats.sp }</td>
                <td>{ char.stats.str }</td>
                <td>{ char.stats.def }</td>
                <td>{ char.stats.int }</td>
                <td>
                  <button
                    class="btn btn-outline-danger btn-sm badge"
                    onClick={ () => store.remove(char) }>&times;</button>
                </td>
              </tr>
            ))
          }
          {
            store.loading === false && store.list && store.list.length == 0 && (
              <tr class="text-center">
                <td colspan="7" class="py-5">
                  <i class="mark-icon text-warning">⚠</i>
                  <p>No chars found!</p>
                </td>
              </tr>
            )
         }
         {
           store.loading === true && (
             <tr class="text-center">
               <td colspan="7" class="py-5">
                 <i class="mark-icon spin text-primary">◌</i>
                 <p>Loading... please wait...</p>
               </td>
             </tr>
           )
         }
        </tbody>
        <tfoot class="bg-light text-right">
          <tr><td colSpan="7">Total: { store.list.length }</td></tr>
        </tfoot>
      </table>
    );
  }
}
