import FiltersForm from "../filtersForm/FiltersForm";
import MainMapWrapper from "../mainMap/MainMap";
import Postamats from "../postamats/Postamats";

const PostamatsPage = () => {
    return(
      <>
            <FiltersForm />
            <div className="container">
              <MainMapWrapper /> 
              <Postamats/>
            </div>
      </>

    );
}

export default PostamatsPage;