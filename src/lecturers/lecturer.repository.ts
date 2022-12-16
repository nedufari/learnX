import { EntityRepository, Repository } from "typeorm";
import { Lecturers } from "../Entity/lecturer.entity";

@EntityRepository(Lecturers)
export class LecturerRepository extends  Repository<Lecturers>{}