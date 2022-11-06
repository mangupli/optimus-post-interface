import FiltersForm from "../filtersForm/FiltersForm";
import MainMap from "../map/MainMap";
import Postamats from "../postamats/Postamats";

const PostamatsPage = () => {
    return(
      <>
            <FiltersForm />
            <div className="container">
              <MainMap /> 
            </div>
              <Postamats/>

      </>

    );
}

export default PostamatsPage;