import { ShopCartProdType, TableShopCartDataType} from "../utils/shop-types.ts";
import {useAppSelector} from "../redux/hooks.ts";
import {removeProductFromCart} from "../firebase/firebaseCartService.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Avatar, Box} from "@mui/material";
import {RemoveIcon} from "./templates/CustomIcons.tsx";
import {getImageURI} from "../utils/tools.ts";


const ShoppingCart = () => {
    const {currProds} = useAppSelector(state => state.products)
    const {authUser} = useAppSelector(state => state.auth)
    const {cartProducts} = useAppSelector(state => state.cart)

    const getTableShopCartProduct = (prod: ShopCartProdType) => {
        const product = currProds.find(item => item.id === prod.cartProdId);
        let res:TableShopCartDataType = {id: undefined, amount: 0, category: "", cost: 0, count: 0, img: "", title: "", unit: ""}
        if (!product)
            removeProductFromCart(`${authUser!.email}_collection`, prod.cartProdId)
        else res  = {...product, count: prod.count, amount: prod.count * product.cost};
        return res;
    }

    const columns : GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90, flex:0.3 },
        { field: 'title', headerName: 'Product Name', width: 150, flex:1 },
       // { field: 'category', headerName: 'Category', width: 90, flex: 0.4 },
        { field: 'unit', headerName: 'Unit', width: 90, flex: 0.4 },
        { field: 'cost', headerName: 'Price in ILS', width: 90, flex: 0.4},
        { field: 'count', headerName: 'Quantity', width: 90, flex: 0.4, editable:true },
        { field: 'amount', headerName: 'Amount in ILS', width: 90, flex: 0.4 },
        { field: 'img', width: 200,flex:0.5, renderCell: (params) => {
                return(
                    <Avatar src={getImageURI(params.value)}/>
                )
            } },
        {field:'actions', type:'actions', flex:0.3,
        getActions: ({id}) => [
            <GridActionsCellItem label={'remove'} icon = {<RemoveIcon/>}
            onClick={() => removeProductFromCart(`${authUser!.email}_collection`, id as string)}
            />

        ]}
    ]

    const rows = cartProducts.map(prod =>  getTableShopCartProduct(prod))
        .filter(tabProd => tabProd.id !== undefined)

    return (
        <Box>
            <DataGrid columns={columns} rows={rows}/>
        </Box>
    );
};

export default ShoppingCart;