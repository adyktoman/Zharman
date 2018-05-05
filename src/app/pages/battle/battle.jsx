// Shared Components
import Header from '../../components/header';

const BattlePage = () => (
  <section class="container-fluid">
    <Header title="Battle Arena" description="Select your char and wait for a challenger!">
      <button class="btn btn-primary btn-sm">⏵ Start</button>
    </Header>
  </section>
);

export default BattlePage;
