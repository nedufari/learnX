import { EntityRepository, Repository } from "typeorm";
import { Files } from "../Entity/files.entity";

@EntityRepository(Files)
export class FilesRepository extends Repository<Files>{
    
}