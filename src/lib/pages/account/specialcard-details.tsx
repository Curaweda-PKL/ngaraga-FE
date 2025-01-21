const products = [
  {
    id: 1,
    name: "Magic Mushroom 0324",
    creator: "Shroomie",
    price: "Rp 200.000",
    image: "/api/placeholder/400/400",
  },
  {
    id: 2,
    name: "Happy Robot 032",
    creator: "BeKind2Robots",
    price: "Rp 200.000",
    image: "/api/placeholder/400/400",
  },
  {
    id: 3,
    name: "Happy Robot 024",
    creator: "BeKind2Robots",
    price: "Rp 200.000",
    image: "/api/placeholder/400/400",
  },
  {
    id: 4,
    name: "AstroFiction",
    creator: "Spaceone",
    price: "Rp 200.000",
    image: "/api/placeholder/400/400",
  },
];

const SpecialCardDetail = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <a href="/account">
          <span className="mr-2">←</span>
          Back
        </a>
      </button>

      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-2">Distant Galaxy Special</h1>
      <p className="text-gray-600 mb-8">Minted on Sep 30, 2022</p>

      {/* Required Cards Section */}
      <div className="mb-12">
        <h2 className="text-xl mb-6">
          Own the cards below for the special card
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex bg-gray-50 rounded-2xl overflow-hidden"
            >
              <div className="w-40 h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.creator}</p>
                <p className="text-gray-600 mb-4">Price</p>
                <p className="font-bold mb-4">{product.price}</p>
                <div className="flex gap-3">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Add to Cart
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Created By Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Created By</h2>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200">
            <img
              src="/api/placeholder/48/48"
              alt="Orbitian"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-medium">Orbitian</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-600 mb-4">The Orbitians</p>
        <p className="text-gray-600 mb-4">
          is a collection of 10,000 unique NFTs on the Ethereum blockchain.
        </p>
        <p className="text-gray-600 mb-4">
          There are all sorts of beings in the NFT Universe. The most advanced
          and friendly of the bunch are Orbitians.
        </p>
        <p className="text-gray-600">
          They live in a metal space machines, high up in the sky and only have
          one foot on Earth. These Orbitians are a peaceful race, but they have
          been at war with a group of invaders for many generations. The
          invaders are called Upside-Downs, because of their inverted bodies
          that live on the ground, yet do not know any other way to be.
          Upside-Downs believe that they will be able to win this war if they
          could only get an eye into Orbitian territory, so they've taken to
          make human beings their target.
        </p>
      </div>

      {/* Details Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="space-y-2">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <span className="mr-2">🌐</span>
            View on Etherscan
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <span className="mr-2">🌐</span>
            View Original
          </button>
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Tags</h2>
        <div className="flex gap-3">
          <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600">
            Animation
          </span>
          <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600">
            illustration
          </span>
          <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600">
            moon
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpecialCardDetail;
