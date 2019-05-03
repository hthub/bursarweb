import { Injectable } from '@angular/core';

@Injectable()
export class Utility {
    isset(value: any): boolean {
        return value !== null && typeof(value) !== 'undefined';
    }
}