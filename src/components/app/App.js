import Header from '../header/Header';
import Menu from '../menu/Menu';

import MapGL from '../map/MapGL';

import Areas from '../areas/Areas';
import Footer from '../footer/Footer';

/* import Map from '../map/Map'; */

import '../../style/style.scss'

function App() {

  return (
    <>
      <Header/>
      <Menu/>
      <main>
        <div className="container main__container">

          <Areas/>
          <MapGL/> 
        </div>
      </main>  
      <Footer/>  
    </>

  );
}

export default App;
