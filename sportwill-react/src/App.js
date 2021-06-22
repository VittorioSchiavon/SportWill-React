import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
     <Router>
      <Header />
     
        <Switch>
          <Route path="/Login" component={Footer}></Route>
          <Route path="/Home" component={Homepage}></Route>
        </Switch>
     
        <Footer/>
      </Router>
    </>
  );
}

export default App;
