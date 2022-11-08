import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getIdsFromFormValues, selectId, deselectId, resetSelectedIds } from '../../actions';

import { useRequestService } from '../../services/RequestService';

import PostamatCard from '../postamatCard/PostamatCard';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PostamatForm = (props) => {

    const {postamats} = props;

  
    const [disabledToPdf, setDisabledToPdf] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const { exportPostamats } = useRequestService();

    const filters = useSelector(state => state.filters);
    const selectedIds = useSelector(state => state.selectedIds);


    const dispatch = useDispatch();

    const toPdf = () => {
        setDisabledToPdf(true)
        const element = document.getElementsByTagName('canvas')[0];
        html2canvas(element)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'px', [2520, 1100]);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("map.pdf");
            }).finally(() => setDisabledToPdf(false))
    }

    const handleSubmit = (filters, ids) => {
        setSubmitting(true)
/*         exportPostamats(filters, ids); */
        console.log('export postamats need to do');
        console.log(filters);
        console.log(ids);
        setSubmitting(false)
    }

/* 
      const changeHeatMap = (values) => {
        dispatch(getIdsFromFormValues(values));
      } */

      const changeField = (e) => {
        if(e.target.checked){
          dispatch(selectId(e.target.id));
        }
        else {
          dispatch(deselectId(e.target.id));
        }
        console.log(e.target);
      }

      const items = postamats.map(postamat => {
        const{id} = postamat;
        const selected = selectedIds.includes(id);
        return(
            <label key={id} className="postamats-list__label">
                <input
                    id={id}
                    name={id}
                    type="checkbox"
                    onChange={e=>changeField(e)}
                    checked={selected}
                    className="postamats-list__input"
                    />
                 <PostamatCard postamat={postamat} selected={selected}/>
                 <div className="postamats-list__choose text_bold">Выбрать</div>
			      </label>  
        );
      })
 
      return (
        <>           
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
                  <div className="postamats-list__total">{`Выбрано ${selectedIds.length} постаматов`}</div>
                  <div className="postamats-list__buttons">
                    <button type="button" /* onClick={() => changeHeatMap(formik.values)} */ className='button_form' /* disabled */>Обновить карту</button>
                    <button type="button" onClick={()=>handleSubmit(filters, selectedIds)}className='button_form' disabled={submitting}>Постаматы (excel)</button>
                    <button type="button" className='button_form' onClick={toPdf} disabled={disabledToPdf || submitting}>Карта (pdf)</button>
                  </div>

                </div>
              </div>
            </div>        
        </>

   
      );
};

export default PostamatForm;
