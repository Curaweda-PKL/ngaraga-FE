const LoginPage = () => {
  return (
    <div className="flex h-screen bg-[#2B2B2B]">
      {/* Left Section - Image */}
      <div className="hidden md:flex flex-1 justify-center items-center">
        <img
          src="/api/placeholder/500/500"
          alt="Decorative"
          className="h-3/4 w-auto object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex justify-center my-32 md:mr-28 px-4 sm:px-0">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl sm:text-5xl text-white font-bold mb-6 text-center">
            Create Account
          </h1>
          <p className="text-white mb-6 text-base sm:text-xl">
            Welcome! Enter Your Details And Start Creating, Collecting Cards
          </p>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className="border border-gray-300 bg-white rounded-full py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="border border-gray-300 bg-white rounded-full py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                placeholder="Email address"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className="border border-gray-300 bg-white rounded-full py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="confirm-password"
                className="border border-gray-300 bg-white rounded-full py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full w-full"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
