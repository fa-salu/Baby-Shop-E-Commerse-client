import { useNavigate } from "react-router-dom";

const CategoryProducts = () => {
  const navigate = useNavigate();

  // Define categories
  const categories = [
    {
      name: "All",
      image:
        "https://img.freepik.com/free-photo/top-view-yellow-sweater-with-toys_23-2148251496.jpg?size=626&ext=jpg&ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
    {
      name: "Toys",
      image:
        "https://img.freepik.com/free-photo/close-up-new-born-baby-with-toys_23-2151004176.jpg?ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
    {
      name: "Clothing",
      image:
        "https://img.freepik.com/premium-photo/pastel-knitted-romper-with-jumper-shoes-cotton-crown-pacifier-set-baby-clothes-accessories-little-princess-beige-background-fashion-newborn-flat-lay-top-view_479776-3800.jpg?ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
    {
      name: "Feeding",
      image:
        "https://img.freepik.com/premium-photo/horizontal-shot-unrecognizable-woman-feeding-her-little-baby-son-with-solid-food_236854-26411.jpg?ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
    {
      name: "Footwear",
      image:
        "https://img.freepik.com/free-photo/top-view-cute-little-baby-accesories-with-copy-space_23-2148415499.jpg?ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
    {
      name: "Bath",
      image:
        "https://img.freepik.com/free-photo/sweet-baby-girl-bathroom_1328-2528.jpg?ga=GA1.1.1683462813.1724928307&semt=ais_hybrid",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      {/* Category Image Box */}
      <div className="grid grid-cols-3 gap-2">
        {categories.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick(item.name)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
