// import { createSlice } from "@reduxjs/toolkit";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// const initialState = {
//     items :[]
// }

// // const [itemData, setItemData] = useState([]);
// const APIClientPrivate = useAxiosPrivate();
// const { auth } = useAuth();

// useEffect(() => {
//   let isMounted = true;
//   const controller = new AbortController();
//   const getitems = async () => {
//     try {
//       const res = await APIClientPrivate.get("/day", {
//         signal: controller.signal,
//       });

//       isMounted && setItemData(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getitems();

//   return () => {
//     isMounted = false;
//     controller.abort();
//   };
// }, []);

// export const itemSlice = createSlice({
//     name:"itemsData",
//     initialState,
//     reducers: {

//     }
// })

// export default itemSlice.reducer