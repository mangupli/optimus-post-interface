import MapGL from '../map/MapGL';
import Areas from '../areas/Areas';
import Menu from '../menu/Menu';

const DistrictsPage = () => {
    return(
      <>
        <Menu/>
        <main>
          <div className="container main__container">
            <Areas/>
            <MapGL/> 
          </div>
        </main>
      </>
    );
}

export default DistrictsPage;