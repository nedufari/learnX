import { EntityRepository, Repository } from "typeorm";
import { Feeds } from "../Entity/feeds.entity";

@EntityRepository(Feeds)
export class FeedsRepository extends Repository<Feeds>{
    
}