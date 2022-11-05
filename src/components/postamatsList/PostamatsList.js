import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequestService } from '../../services/RequestService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import PostamatCard from '../postamatCard/PostamatCard';
import Spinner from '../spinner/Spinner';

import "./postamatsList.scss"

const PostamatsList = ({filters}) => {

    const postamats = useSelector(state => state.postamats);

    const { loadPostamats } = useRequestService();
    const postamatsLoadingStatus = useSelector(state => state.postamatsLoadingStatus);

    useEffect(()=>{
        loadPostamats(filters);
    }, [filters]);

    const spinner = (postamatsLoadingStatus === "loading") ? <Spinner/> : null;
	const errorMessage = (postamatsLoadingStatus === "error") ?  <ErrorMessage/> : null;
	const content = (postamatsLoadingStatus === "idle")  ? <View postamats={postamats}/> : null;

    return(
        <div className='postamats-list'>                   
                {errorMessage}
                {spinner}
                {content}        
        </div>
    )
}

const View = ({postamats}) => {
    const items = postamats.map(postamat => {
        return <PostamatCard postamat={postamat} key={postamat.id}/>
    })
    return(
        <div className="postamats-list__wrapper">
            {items}
        </div>
    )
}

export default PostamatsList;