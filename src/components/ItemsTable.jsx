// import {
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { APIClientPrivate } from "../utils/axios";

// const columns = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "description", label: "Description", minWidth: 100 },
//   {
//     id: "category",
//     label: "Category",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "price",
//     label: "Price",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "food_type",
//     label: "Food Type",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "actions",
//     label: "Actions",
//     minWidth: 170,
//       align: "right",
//     opions: {
//       customBodyRender: (value, tableMeta, updateValue) => {
//         return (
//           <Button onClick={() => console.log(value,tableMeta)}>
//             Edit
//           </Button>
//         )
//      }
//    }

//   },
// ];

// const ItemsTable = () => {
//   const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [itemsData,setItemData ] = useState([])

    
//      useEffect(() => {
//        let isMounted = true;
//        const controller = new AbortController();
//        const getitems = async () => {
//          try {
//            const res = await APIClientPrivate.get("/items", {
//              signal: controller.signal,
//            });

//            isMounted && setItemData(res.data);
//          } catch (error) {
//            console.log(error);
//          }
//        };
//        getitems();

//        return () => {
//          isMounted = false;
//          controller.abort();
//        };
//      }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//     };
    

//     function createData(
//       name,
//       description,
//       category,
//       price,
//       food_type,
//       actions
//     ) {
//       return { name, description, category, price, food_type };
//     }

//     const rows = itemsData.map((item, i) => {
//         return createData(
//           item.name,
//           item.description,
//           item.category.name,
//           item.price,
//           item.food_type,
//             {
//               id: item.id
//           }
//         );
//     })
  
    
//   return (
//     <div>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row,index) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={index}
//                     >
//                       {columns.map((column) => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === "number"
//                               ? column.format(value)
//                               : value}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
                  
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={20}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// };

// export default ItemsTable;
import { Button, Divider, Radio, Table } from "antd";
import React, { useState } from "react";

const columns = [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "description", title: "Description" },
  {
    dataIndex: "category",
    title: "Category",
  },
  {
    dataIndex: "price",
    title: "Price",
    
  },
  {
    dataIndex: "food_type",
    title: "Food Type",
   
  },
  {
    dataIndex: "actions",
    title: "Actions",
    render: () => (
      <Button>
        Edit
      </Button>
    )
    

  },
];

const data = [
  {
    key: "1",
    name: "Burger",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
   {
    key: "2",
    name: "Sandwitch",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
    {
    key: "3",
    name: "Cutlet",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const ItemsTable = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

       <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default ItemsTable