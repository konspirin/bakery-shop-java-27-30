import {Paths} from "./paths.ts";

export type RouteType = {
    path: Paths,
    title: string
}

export type LoginData = {
    email:string,
    password:string
}