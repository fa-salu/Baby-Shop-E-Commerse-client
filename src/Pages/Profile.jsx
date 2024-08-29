// import React, { useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShopContext } from "../Context/CartItem/ShopContext";

// const Profile = () => {
//   const navigate = useNavigate();
//   const { currentUser, logout } = useContext(ShopContext);
  
//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//     }
//   }, [navigate, currentUser]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   if (!currentUser) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-900">Profile</h2>
//         <div className="text-center">
//           <div className="flex justify-center mb-4">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-2 border-blue-500"
//             />
//           </div>
//           <div className="text-left">
//             <p className="text-lg font-medium text-gray-700">
//               Username: <span className="font-normal">{currentUser.username}</span>
//             </p>
//             <p className="text-lg font-medium text-gray-700">
//               Email: <span className="font-normal">{currentUser.email}</span>
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Logout
//         </button>
//         <button
//           onClick={handleGoHome}
//           className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//         >
//           Go Home
//         </button>
//       </div>
//       <Link to={'/orderDetails'}><h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">Order Details</h2></Link>
//       <Link to={'/wishlist'}><h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">Wishlist Details</h2></Link>
//     </div>
//   );
// };

// export default Profile;


import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/CartItem/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(ShopContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        onClick={handleLogout}
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        style={{ transition: "all .15s ease" }}
                      >
                        Logout
                      </button>
                      <button
                        onClick={handleGoHome}
                        className="bg-gray-600 active:bg-gray-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        style={{ transition: "all .15s ease" }}
                      >
                        Go Home
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          Username
                        </span>
                        <span className="text-sm text-gray-500">{currentUser.username}</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          Email
                        </span>
                        <span className="text-sm text-gray-500">{currentUser.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        This is the profile of {currentUser.username}. Feel free to explore more details by clicking on the links below.
                      </p>
                      <Link to={'/orderDetails'}>
                        <h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">
                          Order Details
                        </h2>
                      </Link>
                      <Link to={'/wishlist'}>
                        <h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">
                          Wishlist Details
                        </h2>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
