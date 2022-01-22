import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'modules/User/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const rootDir = __dirname;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        multipleStatements: true,
        host: configService.get('MYSQL_HOST'),
        port: +configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        logging: configService.get('MYSQL_LOGGING') === 'true',
        migrationsRun: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [`${rootDir}/entities/*{.ts,.js}`],
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
