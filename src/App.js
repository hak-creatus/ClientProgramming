import logo from './logo.svg';
import './App.css';
import Top from './components/Top';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Bottom from './components/Bottom';
import About from './components/About';
import Menu from './components/Menu';

function App() {
  return (
    <Container>
      <Top/>
      <Menu/>
      <Bottom/>
    </Container>
  );
}

export default App;
