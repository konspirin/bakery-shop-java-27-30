import {useAppSelector} from "../../redux/hooks.ts";
import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import {ProductType} from "../../utils/shop-types.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const BreadProductsUser = () => {
    const {currProds} = useAppSelector(state => state.products)
    return (
        <Grid container spacing={2}>
            {currProds.map((item:ProductType) =>
                <Grid key={item.id!}  size={{xs:12, sm: 6, md: 3}}>
                    <Card sx={{ maxWidth: 345,
                        height: '100%',
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between"
                    }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={"/images/"+item.img}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            justifyContent:"space-around",
                        }}>
                            <Button size="small" variant={"outlined"} sx={{
                                fontSize: "1.2rem",
                                padding: "0 20px",
                                color:"black",
                                borderColor: "black",
                            }}>+</Button>
                            <Typography sx={{
                                fontSize: "1.2rem",
                            }}>0</Typography>
                            <Button size="small"variant={"outlined"} sx={{
                                fontSize: "1.2rem",
                                color:"black",
                                borderColor: "black",
                                padding: "0 20px"
                            }}>-</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </Grid>

    );
};

export default BreadProductsUser;