import { useSelector } from 'react-redux';
import NewPostamatsList from '../postamatsLists/NewPostamatsList';
import OldPostamatsList from '../postamatsLists/OldPostamatsList';

const Postamats = () => {
    const filters = useSelector(state => state.filters);

    if(!filters){
        return <h3 className="text_bold" style={{textAlign: "center", margin: "50px 0 20px", padding: '50px 0'}}>Настройте нужные фильтры и отобразится список постаматов</h3>;
    }

    return (
        <main style={{padding: '50px 0'}}>
            <NewPostamatsList filters={filters}/>
           <OldPostamatsList />
        </main>
        
    )
}

export default Postamats;