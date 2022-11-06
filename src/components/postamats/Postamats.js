import { useSelector } from 'react-redux';
import PostamatsList from '../postamatsList/PostamatsList';

const Postamats = () => {
    const filters = useSelector(state => state.filters);

    if(!filters){
        return (
            <h3 className="text_bold" style={{textAlign: "center", margin: "50px 0 20px"}}>Настройте нужные фильтры и отобразится список постаматов</h3>
        );
    }

    return (
        <PostamatsList filters={filters}/>
    )
}

export default Postamats;