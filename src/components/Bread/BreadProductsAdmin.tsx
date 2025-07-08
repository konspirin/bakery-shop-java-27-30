/*
export type ProductType = {
    id?:string
    title: string,
    category: string,
    unit:string,
    cost: number,
    img: string
}
 */

import {useAppSelector} from "../../redux/hooks.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Avatar, Box} from "@mui/material";
import {RemoveIcon} from "../templates/CustomIcons.tsx";
import {addProduct, removeProduct, updateProduct} from "../../firebase/firebaseDBService.ts";
import {getImageURI} from "../../utils/tools.ts";
import Button from "@mui/material/Button";
import {useState} from "react";
import AddProductForm from "../AddProductForm.tsx";
import {ProductType} from "../../utils/shop-types.ts";

const BreadProductsAdmin = () => {
    const {currProds} = useAppSelector(state => state.products)
    const [displayForm, setDisplayForm] = useState(false);

    const rows = currProds;
    const columns : GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90, flex:0.3 },
        { field: 'title', headerName: 'Product Name', width: 150, flex:1 },
        { field: 'category', headerName: 'Category', width: 90, flex: 0.4 },
        { field: 'unit', headerName: 'Unit', width: 90, flex: 0.4 },
        { field: 'cost', headerName: 'Price in ILS', width: 90, flex: 0.4, editable:true },
        { field: 'img', width: 200,flex:0.5, renderCell: (params) => {
            return(
                //<Avatar src={'/images/' + params.value}/>
                <Avatar src={getImageURI(params.value)}/>
            )
            },
            editable:true},
        { field: 'actions', type: 'actions', flex: 0.3, getActions: (params) => [
            <GridActionsCellItem label={'remove'} icon={<RemoveIcon/>}
                                 onClick={async () => {
                                     const answer = confirm("This product will be remove finally. Continue?")
                                     if(answer) await removeProduct(params.id as string)
                                 }} />
            ]},
    ]

    function addProductHandler() {
        setDisplayForm(true)
    }

    return (
        <Box sx={{width:"90vw", height:"80vh", margin:"0 auto"}}>
            <DataGrid columns={columns} rows={rows}
            processRowUpdate={async (newRow) => {
                if (newRow.cost <= 0 || newRow.cost > 1000) throw ('Wrong data! Cost must be positive!');
                await updateProduct(newRow);
                return newRow;
            }}
                      onProcessRowUpdateError={(err) => {
                          alert(err + " Changes not saved")
                      }}
            />
            <Button variant={'outlined'}
            onClick={addProductHandler}
            >New Product</Button>
            {displayForm &&
            <AddProductForm submitFn={async (product: ProductType) => {
                await addProduct(product);
                setDisplayForm(false)
            }}/>
            }
        </Box>
    );
};

export default BreadProductsAdmin;