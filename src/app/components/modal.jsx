const Modal = ({ children, id, title }) => (
  <div class="modal fade" id={ id } aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{ title }</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        { children }
      </div>
    </div>
  </div>
);

export default Modal;
