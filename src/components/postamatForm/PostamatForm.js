import { useState } from 'react';

import { useFormik } from 'formik';

import { useRequestService } from '../../services/RequestService';

import PostamatCard from '../postamatCard/PostamatCard';

const PostamatForm = (props) =>{

    const {postamats} = props;

    const [chosenItems, setChosenItems] = useState(0);

    const { exportPostamats } = useRequestService();


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

        if(e.target.checked){
          setChosenItems(prev => prev + 1)
        }
        else{
          setChosenItems(prev => prev - 1)
        }
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
                    value={formik.values[id]}
                    className="postamats-list__input"
                    />
                 <PostamatCard postamat={postamat} choosen={formik.values[id]}/>
                 <div className="postamats-list__choose text_bold">Выбрать</div>
			      </label>  
        );
      })
 
      return (
        <>           
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="postamats-list__overflow">
                <div className="postamats-list__wrapper">
                  {items}
                </div>           
              </div>
            </div>
            <div className="postamats-list__panel">
              <div className="container">
                <div className="postamats-list__panel-wrapper">
                  <div className="postamats-list__total">{`Выбрано ${chosenItems} постаматов`}</div>
                  <div className="postamats-list__buttons">
                    <button type="submit" className='button_form'>Постаматы (excel)</button>   
                    <button type="button" className='button_form'>Карта (pdf)</button>  
                  </div>

                </div>
              </div>
            </div>
          </form>         
        </>

   
      );
};

export default PostamatForm;