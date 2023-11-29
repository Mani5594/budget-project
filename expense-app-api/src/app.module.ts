import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { BudgetModule } from './budget/budget.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ExpenseModule,
    BudgetModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'budget-management',
      autoLoadEntities: true,
      synchronize: true,
      // url: 'postgres://akbuoyeu:IBdtyOWzicjsrNmVhkovAkJhq0BGc3ad@cornelius.db.elephantsql.com/akbuoyeu'
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
