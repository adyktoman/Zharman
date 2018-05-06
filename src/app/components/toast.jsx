import $ from 'jquery';

export const Toaster = {
  push(id, message, type) {
    const $message = $(`<div class="toast-message toast-${type}">${message}<span class="toast-dismiss">&times;</span></div>`);
    $message.hide()
    $(`#${id}`).prepend($message);
    $message.slideUp().fadeIn({ duration: 1000, queue:false })
  },
  error(id, message) {
    this.push(id, message, 'error');
  },
  info(id, message) {
    this.push(id, message, 'info');
  },
  success(id, message) {
    this.push(id, message, 'success');
  },
  warning(id, message) {
    this.push(id, message, 'warning');
  }
};

$(document).on('click', '.toast-dismiss', (e) => {
  const $elem = $(e.target);
  $elem
    .hide()
    .parent()
    .slideUp()
    .fadeOut({
      duration: 1000,
      queue:false,
      done: () => $elem.parent().remove() });
})

const Toast = ({ name }) => (
  <div class="toast" id={ name } />
);

export default Toast;
