
import {addCategory, isCathegoryExists, removeCategory} from "../src/firebase/firebaseDBService";
import { getApps, deleteApp } from 'firebase/app';
import {getRandomNumber} from "../src/utils/tools";




describe('BakeryShop.dbService', () => {
    afterAll(async () => {
        await Promise.all(getApps().map(deleteApp));
    });
    test('isCathegoryExists', async () => {
        await expect(isCathegoryExists('bread')).resolves.toBeTruthy()
        await expect(isCathegoryExists('milk')).resolves.not.toBeTruthy()
    })
})



describe("Tasks homework #42: ",() => {
    const categories: string[] = ['bread', 'biscuits', 'croissants', 'cake', 'pizza']

    afterAll(async () => {
        await Promise.all(getApps().map(deleteApp));
    });

    test('random category', async () => {
        const category = categories[getRandomNumber(0, categories.length)]
        await expect(isCathegoryExists(category)).resolves.toBeTruthy();
    })

    test('all category exists', async () => {
        const promiseArr = categories.map(cat => isCathegoryExists(cat));
        const resArr = await Promise.all(promiseArr);
        const res = resArr.every(item => item);
        expect(res).toBeTruthy();
    })

    test('remove add category', async () => {
        const cat = 'bread'
        await removeCategory(cat)
        expect(await isCathegoryExists(cat)).toBeFalsy()
        await addCategory({category_name: cat})
        expect(await isCathegoryExists(cat)).toBeTruthy()
    })

})
