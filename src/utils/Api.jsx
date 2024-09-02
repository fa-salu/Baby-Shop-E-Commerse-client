// import { useState, useEffect } from "react";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     fetch(url, { signal })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setData(data);
//         setIsPending(false);
//         setError(null);
//       })
//       .catch((err) => {
//         if (err.name !== 'AbortError') { // Ignore abort errors
//           setIsPending(false);
//           setError(err.message);
//         }
//       });

//     return () => {
//       abortController.abort(); // Cleanup on unmount or URL change
//     };
//   }, [url]);

//   return { data, isPending, error };
// };

// export default useFetch;



import { useState, useEffect } from "react";
import Cookie from "js-cookie";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookie.get("token"); // Get the token from cookies

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
