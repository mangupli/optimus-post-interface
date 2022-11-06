import { useState, } from 'react';
import { useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useRequestService } from '../../services/RequestService';

import PostamatCard from '../postamatCard/PostamatCard';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PostamatForm = (props) => {

    const {postamats} = props;

    const [chosenItems, setChosenItems] = useState(0);
    const [disabledToPdf, setDisabledToPdf] = useState(false)

    const { exportPostamats } = useRequestService();

    const filters = useSelector(state => state.filters);


    const init = {};

    const toPdf = () => {
        setDisabledToPdf(true)
        const element = document.getElementsByTagName('canvas')[0];
        html2canvas(element)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: "landscape"
                });
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("map.pdf");
            }).finally(() => setDisabledToPdf(false))
    }

    postamats.forEach(postamat => {
        const id = postamat.id;
        init[id]= false;
    });

    const formik = useFormik({

        initialValues: init,
   
        onSubmit: values => {
   
          console.log(JSON.stringify(values, null, 2));
          exportPostamats(filters, values);
          
        },
   
      });

      const changeField = (e) => {
        formik.handleChange(e);

        if(e.target.checked){
          setChosenItems(prev => prev + 1)
        }
        else {
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
                    <button type="button" className='button_form' onClick={toPdf} disabled={disabledToPdf}>Карта (pdf)</button>
                  </div>

                </div>
              </div>
            </div>
          </form>         
        </>

   
      );
};

export default PostamatForm;