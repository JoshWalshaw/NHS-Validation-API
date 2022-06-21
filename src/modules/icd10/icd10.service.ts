import { Injectable } from '@nestjs/common';

@Injectable()
export class Icd10Service {
    async testing(): Promise<void> {
        console.log('being hit')
    }
}
