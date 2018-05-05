const Table = ({ cols, data, footer, loading, renderEmpty, renderLoading }) => (
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
              { renderEmpty() }
            </td>
          </tr>
        )
      }
      {
        loading === true && (
          <tr class="text-center">
            <td colspan={ cols.length + 1 } class="py-5">
              { renderLoading() }
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
