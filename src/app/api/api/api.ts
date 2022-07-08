export * from './auth.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { PlatformOldService } from './platformOld.service';
import { PlatformService } from './platform.service';
import { KPIsService } from './kpis.service';
import { PeriodService } from './period.service';
import { StatisticsService } from './statistics.service';
import { ContextualService } from './contextual.service';
import { ScoresService } from './scores.service';

export const APIS = [AuthService, UserService, PlatformService, KPIsService, PlatformOldService, PeriodService, StatisticsService, ContextualService, ScoresService];
