const Header = ({ children, description, title }) => (
  <div>
    <nav class="navbar navbar-light border-bottom px-0 mb-3">
      <h3>{ title }</h3>
      { children }
    </nav>
    <p class="text-muted">{ description }</p>
  </div>
);

export default Header;
