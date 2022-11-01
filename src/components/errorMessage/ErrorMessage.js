import img1 from './error.gif'

const ErrorMessage = () => {
    return (
    <div>
            <h2 style={{textAlign: 'center'}}>Ой... что-то пошло не так</h2>
            <img style={{display:'block', width: '250px', objectFit: 'contain', margin: "10px auto 0"}} src={img1} alt="error"/>
    </div>   
    )
}

export default ErrorMessage;