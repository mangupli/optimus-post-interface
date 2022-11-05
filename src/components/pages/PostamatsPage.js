import FiltersForm from "../filtersForm/FiltersForm";
import MainMapWrapper from "../mainMap/MainMap";
import Postamats from "../postamats/Postamats";

const PostamatsPage = () => {
    return(
      <>
            <FiltersForm />
            <MainMapWrapper /> 
            <Postamats/>
      </>

    );
}

export default PostamatsPage;