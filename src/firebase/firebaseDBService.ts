
import {doc, collection, getDoc, setDoc, deleteDoc, getCountFromServer} from 'firebase/firestore';
import {db} from "../configurations/firebase-config.ts";
import type {ProductType} from "../utils/shop-types.ts";
import {getRandomNumber} from "../utils/tools.ts";

const prodColl = collection(db, "product_collection");
const categoryColl = collection(db, "category_collection");

export const addProduct = async (product:ProductType) => {
    product.id = getRandomNumber(10000, 99999)+"";
    const ref = doc(prodColl, product.id);
    await setDoc(ref,product)
}