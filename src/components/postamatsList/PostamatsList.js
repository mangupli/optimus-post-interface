import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRequestService } from '../../services/RequestService';


import ErrorMessage from '../errorMessage/ErrorMessage';
import PostamatCard from '../postamatCard/PostamatCard';
import Spinner from '../spinner/Spinner';
import PostamatForm from '../postamatForm/PostamatForm';

import "./postamatsList.scss"

const PostamatsList = ({filters}) => {

    const newPostamats = useSelector(state => state.newPostamats);
    const oldPostamats = useSelector(state => state.oldPostamats);

    const { loadPostamats } = useRequestService();
    const postamatsLoadingStatus = useSelector(state => state.postamatsLoadingStatus);

    useEffect(()=>{
        loadPostamats(filters);
    }, [filters]);

    const spinner = (postamatsLoadingStatus === "loading") ? <Spinner/> : null;
	const errorMessage = (postamatsLoadingStatus === "error") ?  <ErrorMessage/> : null;
    const predict = (postamatsLoadingStatus === "idle")  ? <PostamatForm postamats={newPostamats}/> : null; 

    const oldPostamatsCards = oldPostamats.map(postamat=>{
        return <PostamatCard postamat={postamat} key={postamat.id}/>
    })

    return(
        <>
            <div className="container">
                <div className="postamats-list__title">{`Рекомендованные постаматы : ${newPostamats.length}`}</div>
            </div>
            
            <div className='postamats-list'>                   
                    {errorMessage}
                    {spinner}
                    {predict}        
            </div>

            <div className="container">
            <div className="postamats-list__title">{`Установленные постаматы : ${oldPostamats.length}`}</div>
                <div className='postamats-list'>   
                    <div className='postamats-list__wrapper'>                 
                        {oldPostamatsCards}        
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostamatsList;