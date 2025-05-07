import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
class BlockUI {
    document;
    el;
    cd;
    config;
    renderer;
    /**
     * Name of the local ng-template variable referring to another component.
     * @group Props
     */
    target;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Current blocked state as a boolean.
     * @group Props
     */
    get blocked() {
        return this._blocked;
    }
    set blocked(val) {
        if (this.mask && this.mask.nativeElement) {
            if (val)
                this.block();
            else
                this.unblock();
        }
        else {
            this._blocked = val;
        }
    }
    templates;
    mask;
    _blocked = false;
    animationEndListener;
    contentTemplate;
    constructor(document, el, cd, config, renderer) {
        this.document = document;
        this.el = el;
        this.cd = cd;
        this.config = config;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    block() {
        this._blocked = true;
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            this.target.getBlockableElement().style.position = 'relative';
        }
        else {
            this.renderer.appendChild(this.document.body, this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.mask.nativeElement, this.baseZIndex + this.config.zIndex.modal);
        }
    }
    unblock() {
        if (this.mask) {
            this.animationEndListener = this.renderer.listen(this.mask.nativeElement, 'animationend', this.destroyModal.bind(this));
            DomHandler.addClass(this.mask.nativeElement, 'p-component-overlay-leave');
        }
    }
    destroyModal() {
        this._blocked = false;
        if (this.mask) {
            DomHandler.removeClass(this.mask.nativeElement, 'p-component-overlay-leave');
            ZIndexUtils.clear(this.mask.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.mask.nativeElement);
        }
        this.unbindAnimationEndListener();
        this.cd.markForCheck();
    }
    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    ngOnDestroy() {
        this.unblock();
        this.destroyModal();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BlockUI, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: BlockUI, selector: "p-blockUI", inputs: { target: "target", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", styleClass: "styleClass", blocked: "blocked" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], ngImport: i0, template: `
        <div
            #mask
            [class]="styleClass"
            [attr.aria-busy]="blocked"
            [ngClass]="{ 'p-blockui-document': !target, 'p-blockui p-component-overlay p-component-overlay-enter': true }"
            [ngStyle]="{ display: blocked ? 'flex' : 'none' }"
            [attr.data-pc-name]="'blockui'"
            [attr.data-pc-section]="'root'"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `, isInline: true, styles: [".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { BlockUI };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BlockUI, decorators: [{
            type: Component,
            args: [{ selector: 'p-blockUI', template: `
        <div
            #mask
            [class]="styleClass"
            [attr.aria-busy]="blocked"
            [ngClass]="{ 'p-blockui-document': !target, 'p-blockui p-component-overlay p-component-overlay-enter': true }"
            [ngStyle]="{ display: blocked ? 'flex' : 'none' }"
            [attr.data-pc-name]="'blockui'"
            [attr.data-pc-section]="'root'"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }, { type: i0.Renderer2 }]; }, propDecorators: { target: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], blocked: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }] } });
class BlockUIModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BlockUIModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: BlockUIModule, declarations: [BlockUI], imports: [CommonModule], exports: [BlockUI] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BlockUIModule, imports: [CommonModule] });
}
export { BlockUIModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BlockUIModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [BlockUI],
                    declarations: [BlockUI]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9ibG9ja3VpL2Jsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQWlCLHVCQUF1QixFQUFxQixTQUFTLEVBQUUsZUFBZSxFQUFjLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFnRCxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdk8sT0FBTyxFQUFpQixhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBQzVDOzs7R0FHRztBQUNILE1BdUJhLE9BQU87SUErQ3NCO0lBQTJCO0lBQXVCO0lBQThCO0lBQStCO0lBOUNySjs7O09BR0c7SUFDTSxNQUFNLENBQU07SUFDckI7OztPQUdHO0lBQ00sVUFBVSxHQUFZLElBQUksQ0FBQztJQUNwQzs7O09BR0c7SUFDTSxVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ0gsSUFBYSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxPQUFPLENBQUMsR0FBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEMsSUFBSSxHQUFHO2dCQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFH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QUFhO2tCQUx6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNsQixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbi8qKlxuICogQmxvY2tVSSBjYW4gZWl0aGVyIGJsb2NrIG90aGVyIGNvbXBvbmVudHMgb3IgdGhlIHdob2xlIHBhZ2UuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYmxvY2tVSScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgI21hc2tcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYnVzeV09XCJibG9ja2VkXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtYmxvY2t1aS1kb2N1bWVudCc6ICF0YXJnZXQsICdwLWJsb2NrdWkgcC1jb21wb25lbnQtb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5LWVudGVyJzogdHJ1ZSB9XCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogYmxvY2tlZCA/ICdmbGV4JyA6ICdub25lJyB9XCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYmxvY2t1aSdcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2Jsb2NrdWkuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEJsb2NrVUkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIHJlZmVycmluZyB0byBhbm90aGVyIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGJsb2NrZWQgc3RhdGUgYXMgYSBib29sZWFuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBibG9ja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tlZDtcbiAgICB9XG4gICAgc2V0IGJsb2NrZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2sgJiYgdGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHRoaXMuYmxvY2soKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy51bmJsb2NrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ibG9ja2VkID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ21hc2snKSBtYXNrOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgX2Jsb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFuaW1hdGlvbkVuZExpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93ICdUYXJnZXQgb2YgQmxvY2tVSSBtdXN0IGltcGxlbWVudCBCbG9ja2FibGVVSSBpbnRlcmZhY2UnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibG9jaygpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5nZXRCbG9ja2FibGVFbGVtZW50KCkuYXBwZW5kQ2hpbGQoKHRoaXMubWFzayBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQoKS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgKHRoaXMubWFzayBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnbW9kYWwnLCAodGhpcy5tYXNrIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJsb2NrKCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQsICdhbmltYXRpb25lbmQnLCB0aGlzLmRlc3Ryb3lNb2RhbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQsICdwLWNvbXBvbmVudC1vdmVybGF5LWxlYXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLm1hc2submF0aXZlRWxlbWVudCwgJ3AtY29tcG9uZW50LW92ZXJsYXktbGVhdmUnKTtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMubWFzay5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bmJpbmRBbmltYXRpb25FbmRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHVuYmluZEFuaW1hdGlvbkVuZExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciAmJiB0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgICB0aGlzLmRlc3Ryb3lNb2RhbCgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQmxvY2tVSV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQmxvY2tVSV1cbn0pXG5leHBvcnQgY2xhc3MgQmxvY2tVSU1vZHVsZSB7fVxuIl19