import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequestService } from '../../services/RequestService';

import { Formik, Form, Field, useField, useFormikContext} from "formik";

import ErrorMessage from '../errorMessage/ErrorMessage';
import PostamatCard from '../postamatCard/PostamatCard';
import Spinner from '../spinner/Spinner';
import PostamatForm from '../postamatForm/PostamatForm';

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
/* 	const content = (postamatsLoadingStatus === "idle")  ? <View postamats={postamats}/> : null; */
    const content = (postamatsLoadingStatus === "idle")  ? <PostamatForm postamats={postamats}/> : null; 

    return(
        <div className='postamats-list'>                   
                {errorMessage}
                {spinner}
                {content}        
        </div>
    )
}


export default PostamatsList;