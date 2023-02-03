import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../Entity/users.entity";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity>{
    
}