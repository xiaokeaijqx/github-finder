import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';


function NotFound(props) {
  return (
    <div className="hero">
      <div className="text-center  ">
        <h1 className="text-8xl font-bold mb-8">
          0ops!
        </h1>
        <p className="text-5xl mb-8"> 404 -Page not found!</p>
        <Link to="/" className="btn btn-primary btn-lg">
          <FaHome className="mr-2"/>Back to home
        </Link>
      </div>

    </div>
  );
}

export default NotFound;