import { Container } from "@tsclean/core/dist/decorators/container.decorator";
import {controllers} from "@/infrastructure/entry-points/api";
import { adapters, services } from "@/infrastructure/driven-adapters/providers";

@Container({
    imports: [],
    providers: [...services, ...adapters],
    controllers: [...controllers]
})

export class AppContainer {}
