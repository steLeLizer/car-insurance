import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DB_URI || 'mongodb://localhost/car-insurance',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
