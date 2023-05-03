import { Link } from 'react-router-dom';
import mage from '../img/404notfound.jpg'
// import HomePage from './HomePage';
const NotFoundPage = () =>{
    return(
        <div className='img404'>
            <img src={mage} alt="404" width='700'></img>
            <h1>Let's go to <Link className='img-h1-link' to='/'>Home</Link></h1>
        </div>
    )
}

export default NotFoundPage;