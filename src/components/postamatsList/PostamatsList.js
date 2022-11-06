import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequestService } from '../../services/RequestService';

import { Formik, Form, Field, useField, useFormikContext} from "formik";

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
        return (
            <MyCheckbox name={postamat.id} key={postamat.id}>

                <PostamatCard postamat={postamat} />

            </MyCheckbox>
        )}
    )
    return(
        <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {

            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
            }}
        >

            <Form  className="postamats-list__wrapper">
                {items}
                


            <button className='button button_small' type="submit">Выбрать</button>

            </Form>

        </Formik>
    )
}

/* const PostamatsList = (props) => {
	return(
		<div className="postamats-list" style={{marginTop: '20px'}}>
			<MyCheckbox name="postamat">
				<PostamatCard/>
			</MyCheckbox>
		</div>
);
}*/

const MyCheckbox = ({children, ...props}) => {
  
	//field — объект с пропсами + onBlur + onChange...
	//meta — метаданные с ошибками, и был ли использован этот инпут
	const [field, meta] = useField({...props, type: 'checkbox'});

	return(
		<>
			<label style={{display: 'flex', gap: '10px'}}>
				<input type="checkbox" {...props} {...field} /> 
					{children}
			</label>
		   {meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
		   ) : null}
		</>
	);
} 

export default PostamatsList;