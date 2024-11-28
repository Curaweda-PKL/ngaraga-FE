import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="text-white text-center m-20 text-4xl hover:bg-sky-700 ">
      <p>Resource not found</p>
      <Link to="/" className="text-blue-500 ">
        <p>Go back to home</p>
        <p>the ugliest 404 you would find?</p>

        
      </Link>
    </div>
  );
};

export default Page404;
