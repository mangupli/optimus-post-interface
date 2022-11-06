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
            <label key={id} style={{display: 'flex', gap: '10px'}}>
                <input
                    id={id}
                    name={id}
                    type="checkbox"
                    onChange={e=>changeField(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.id}
                    />
                 <PostamatCard postamat={postamat} choosen={formik.values[id]}/>
			</label>  
        );
      })
 
      return (
   
        <form onSubmit={formik.handleSubmit} className="postamats-list__wrapper">
            {items}			
          <button type="submit" className='button button_small'>Выбрать</button>   
        </form>
   
      );
};

export default PostamatForm;