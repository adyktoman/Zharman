import Icon from './icon';

const Table = ({ cols, data, footer, loading }) => (
  <table class="table table-sm table-hover">
    <thead>
      <tr class="bg-dark text-white">
        {
          cols && cols.map( column => (
            <th>{ column.label }</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        loading === false && data && data.map( row => (
          <tr>
            {
              cols && cols.map( (column) => (
                <td>{ column.content(row) }</td>
              ))
            }
          </tr>
        ))
      }
      {
        loading === false && data && data.length == 0 && (
          <tr class="text-center">
            <td colspan={ cols.length + 1 } class="py-5">
              <Icon className="text-primary" figure="warning" size="lg" />
              <p>No chars found!</p>
            </td>
          </tr>
        )
      }
      {
        loading === true && (
          <tr class="text-center">
            <td colspan={ cols.length + 1 } class="py-5">
              <Icon className="text-muted icon-spin" figure="spinner" size="lg" />
              <p>Loading... please wait...</p>
            </td>
          </tr>
        )
      }
    </tbody>
    <tfoot class="bg-light text-right">
      <tr><td colSpan={ cols.length + 1 }>{ footer }</td></tr>
    </tfoot>
  </table>
);

export default Table;
