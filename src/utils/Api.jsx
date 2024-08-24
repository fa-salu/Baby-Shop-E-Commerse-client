import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') { // Ignore abort errors
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => {
      abortController.abort(); // Cleanup on unmount or URL change
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;



// import { useState, useEffect } from "react";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       fetch(url)
//         .then((res) => {
//           if (!res.ok) {
//             throw Error("Error fetching data");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setData(data);
//           setIsPending(false);
//           setError(null);
//         })
//         .catch((err) => {
//           setIsPending(false);
//           setError(err.message);
//         });
//     }, 1000);
//   }, [url]);

//   return { data, isPending, error };
// };

// export default useFetch;
