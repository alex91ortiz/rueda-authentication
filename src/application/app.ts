import {Container, Module} from "@tsclean/core";
import {controllers} from "@/infrastructure/entry-points/api";
import { adapters, services } from "@/infrastructure/driven-adapters/providers";

@Container({
    imports: [],
    controllers: [...controllers],
    providers: [...services, ...adapters]
})


export class AppContainer {}
