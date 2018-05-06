import Header from '../../components/header';

const HomePage = () => (
  <section class="container-fluid">
    <Header
      description="Please, create a lot of chars :D"
      icon="home"
      title="Welcome!" >
      <button
        data-target="#charEditorModal"
        data-toggle="modal"
        class="btn btn-sm btn-primary ml-auto"
        type="button">➕ NEW</button>
    </Header>
  </section>
);

export default HomePage;
