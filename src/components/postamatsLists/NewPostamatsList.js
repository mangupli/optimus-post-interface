import { useEffect} from 'react';
import { useSelector } from 'react-redux';

import { useRequestService } from '../../services/RequestService';


import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PostamatForm from '../postamatForm/PostamatForm';

import "./postamatsList.scss"

const NewPostamatsList = ({filters}) => {

    const newPostamats = useSelector(state => state.newPostamats);

    const { loadPostamats } = useRequestService();
    const postamatsLoadingStatus = useSelector(state => state.postamatsLoadingStatus);

    useEffect(()=>{
        loadPostamats(filters);
    }, [filters]);

    const spinner = (postamatsLoadingStatus === "loading") ? <Spinner/> : null;
	const errorMessage = (postamatsLoadingStatus === "error") ?  <ErrorMessage/> : null;
    const predict = (postamatsLoadingStatus === "idle")  ? <PostamatForm postamats={newPostamats}/> : null; 

    return(
            <div className="postamats-list__new">
                <div className="container">
                    <div className="postamats-list__title">{`Рекомендованные постаматы : ${newPostamats.length}`}</div>
                </div>
                
                <div className='postamats-list'>                   
                        {errorMessage}
                        {spinner}
                        {predict}        
                </div>
            </div>           
    )
}

export default NewPostamatsList;