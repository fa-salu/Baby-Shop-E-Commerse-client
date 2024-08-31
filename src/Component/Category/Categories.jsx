import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../utils/Api";

const CategoryProducts = () => {
  const { category } = useParams(); 
  const navigate = useNavigate();
  
  // Fetch products based on the category
  const { data, isPending, error } = useFetch(
    category === "All"
      ? `http://localhost:5000/users/products`
      : `http://localhost:5000/users/products/${category}`
  );  

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  const categories = ["All", "Toys", "Clothing", "Feeding", "Footwear", "Bath"];

  return (
    <div className="container align-middle p-4 h-[100vh] overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Categories </h1>

      <div className="flex justify-center mb-8">
        {categories.map((item) => (
          <button
            key={item}
            className={`px-4 py-2 mx-2 text-sm font-medium border rounded-md ${
              category === item
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => navigate(`/categories/${item}`)}
          >
            {item}
          </button>
        ))}
      </div>

      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover mb-4 rounded"
                onClick={() => handleProductClick(item._id)}
              />
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-semibold">${item.price}</p>
              <p className="text-gray-500">Category: {item.category}</p>
              <p className="text-yellow-500">Rating: {item.stars} stars</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
