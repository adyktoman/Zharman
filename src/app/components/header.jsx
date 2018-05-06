// Shared components
import Icon from './icon';

const Header = ({ children, description, icon, title }) => (
  <div>
    <nav class="navbar navbar-light border-bottom px-0 mb-3">
      <h3>
        <Icon className="text-primary" figure={ icon } size="md" />
        &nbsp;{ title }
      </h3>
      { children }
    </nav>
    <p class="text-muted">{ description }</p>
  </div>
);

export default Header;
