import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/tours" exact component={Tours} />
        <Route path="/tours/:id" component={TourDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={FAQ} />
        <Route path="/booking/:tourId" component={Booking} />
      </Switch>
    </Router>
  );
}

export default App;
