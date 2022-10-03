import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { helper } from './helper/helper';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
    ],
    exports: [
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule,
    ],
    providers: [
        helper
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
            ]
        };
    }
}

