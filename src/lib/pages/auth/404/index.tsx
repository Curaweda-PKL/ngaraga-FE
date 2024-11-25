import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="grid gap-4 md:flex md:min-h-[60vh] md:items-center">
      <p>resource not found</p>
      <Link to="/" className="text-blue-500">
        <p>Go back to home</p>
      </Link>
    </div>
  );
};

export default Page404;
