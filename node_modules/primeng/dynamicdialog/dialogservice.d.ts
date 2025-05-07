import { ComponentFactoryResolver, ApplicationRef, Injector, Type, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import * as i0 from "@angular/core";
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
export declare class DialogService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private document;
    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>>;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector, document: Document);
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    open(componentType: Type<any>, config: DynamicDialogConfig): DynamicDialogRef;
    private appendDialogComponentToBody;
    private removeDialogComponentFromBody;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}
