import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsRepository } from './budget.repository';
import { Budget } from './budget.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Budget]),
        AuthModule
    ],
    controllers: [BudgetController],
    providers: [BudgetService, BudgetsRepository]
})
export class BudgetModule {}
