import { useFormik } from 'formik';
import { createRoutesFromChildren } from 'react-router-dom';

import PostamatCard from '../postamatCard/PostamatCard';

const PostamatForm = (props) =>{

    const {postamats} = props;

    const init = {};

    postamats.forEach(postamat => {
        const id = postamat.id;
        init[id]= false;
    });

    const formik = useFormik({

        initialValues: init,
   
        onSubmit: values => {
   
          console.log(JSON.stringify(values, null, 2));
   
        },
   
      });

      const changeField = (e) => {
        formik.handleChange(e);
/*         formik.setFieldValue('e.target.id', true); */
        console.log(e.target);
      }

      const items = postamats.map(postamat => {
        const{id} = postamat;
        return(
            <label key={id} className="postamats-list__label">
                <input
                    id={id}
                    name={id}
                    type="checkbox"
                    onChange={e=>changeField(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.id}
                    className="postamats-list__input"
                    />
                 <PostamatCard postamat={postamat} choosen={formik.values[id]}/>
                 <div className="postamats-list__choose text_bold">Выбрать</div>
			      </label>  
        );
      })
 
      return (
        <>           
          <form onSubmit={formik.handleSubmit} className="postamats-list__wrapper">
              {items}			
            <button type="submit" className='button button_small'>Выбрать</button>   
            <button type="button" className='button button_small'>Карта (pdf)</button>  
          </form>         
        </>

   
      );
};

export default PostamatForm;