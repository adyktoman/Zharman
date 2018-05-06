// Shared Components
import Header from '../../components/header';

const UsersPage = () => (
  <section class="container-fluid">
    <Header title="Users Manager" icon="skull" description="Grant access to this app.">
      <button class="btn btn-primary btn-sm">➕ Add</button>
    </Header>
  </section>
);

export default UsersPage;
