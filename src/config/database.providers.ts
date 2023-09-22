import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity, TodoEntity } from 'src/entities';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [UserEntity, TodoEntity],
        synchronize: true,
        uuidExtension: 'pgcrypto',
        logging: configService.get('is_dev'),
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
