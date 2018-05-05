import { Link } from 'preact-router/match';

const Menu = ({ links, title }) => (
  <nav class="navbar navbar-expand-sm navbar-light bg-primary">
    <Link class="navbar-brand text-white" href={ title.url }>{ title.label }</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#topMenu" aria-controls="topMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="topMenu">
      <div class="navbar-nav">
        {
          links && links.map( link => (
            <Link activeClassName="active text-white" class="nav-item nav-link" href={ link.url}>{ link.label }</Link>
          ))
        }
      </div>
    </div>
  </nav>
);

export default Menu;
