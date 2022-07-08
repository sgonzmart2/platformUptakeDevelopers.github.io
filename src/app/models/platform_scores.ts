export interface Platform_Scores {
    contextual: number;
    business: number;
    technical: number;
    peu: number;
    tp: number;
    gov: number;
    euc: number;
}

export class MyPlatformScore implements Platform_Scores {
    contextual: 0;
    business: 0;
    technical: 0;
    peu: 0;
    tp: 0;
    gov: 0;
    euc: 0;
    constructor() { }
}
