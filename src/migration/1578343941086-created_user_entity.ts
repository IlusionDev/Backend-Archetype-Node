import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedUserEntity1578343941086 implements MigrationInterface {
    name = 'createdUserEntity1578343941086'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `hash` varchar(36) NOT NULL, `is_active` tinyint NOT NULL, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
