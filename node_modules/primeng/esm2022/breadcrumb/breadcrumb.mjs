import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { HomeIcon } from 'primeng/icons/home';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/tooltip";
/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
class Breadcrumb {
    router;
    /**
     * An array of menuitems.
     * @group Props
     */
    model;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * MenuItem configuration for the home icon.
     * @group Props
     */
    home;
    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    homeAriaLabel;
    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    onItemClick = new EventEmitter();
    templates;
    separatorTemplate;
    constructor(router) {
        this.router = router;
    }
    onClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }
    onHomeClick(event) {
        if (this.home) {
            this.onClick(event, this.home);
        }
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'separator':
                    this.separatorTemplate = item.template;
                    break;
            }
        });
    }
    isCurrentUrl(item) {
        const { routerLink } = item;
        const lastPath = this.router ? this.router.url : '';
        return routerLink === lastPath ? 'page' : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Breadcrumb, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Breadcrumb, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home", homeAriaLabel: "homeAriaLabel" }, outputs: { onItemClick: "onItemClick" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ul [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
                <li [class]="home.styleClass" [ngClass]="{ 'p-breadcrumb-home': true, 'p-disabled': home.disabled }" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions" [attr.data-pc-section]="'home'">
                    <a
                        [href]="home.url ? home.url : null"
                        *ngIf="!home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        class="p-menuitem-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.id]="home.id"
                        [attr.tabindex]="home.disabled ? null : '0'"
                        [ariaCurrentWhenActive]="isCurrentUrl(home)"
                    >
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iprivateyle"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-menuitem-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{ home.label }}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="home.routerLink"
                        [routerLink]="home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        [queryParams]="home.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.id]="home.id"
                        [attr.tabindex]="home.disabled ? null : '0'"
                        [ariaCurrentWhenActive]="isCurrentUrl(home)"
                        [fragment]="home.fragment"
                        [queryParamsHandling]="home.queryParamsHandling"
                        [preserveFragment]="home.preserveFragment"
                        [skipLocationChange]="home.skipLocationChange"
                        [replaceUrl]="home.replaceUrl"
                        [state]="home.state"
                    >
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-menuitem-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-menuitem-text">{{ home.label }}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li *ngIf="model && home" class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                    <ChevronRightIcon *ngIf="!separatorTemplate" />
                    <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                </li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style" [ngClass]="{ 'p-disabled': item.disabled }" pTooltip [tooltipOptions]="item.tooltipOptions" [attr.data-pc-section]="'menuitem'">
                        <a
                            *ngIf="!item.routerLink"
                            [attr.href]="item.url ? item.url : null"
                            class="p-menuitem-link"
                            (click)="onClick($event, item)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [ariaCurrentWhenActive]="isCurrentUrl(item)"
                        >
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlLabel" class="p-menuitem-text">{{ item.label }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="item.routerLink"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            class="p-menuitem-link"
                            (click)="onClick($event, item)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                            [ariaCurrentWhenActive]="isCurrentUrl(item)"
                        >
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlRouteLabel" class="p-menuitem-text">{{ item.label }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                    </li>
                    <li *ngIf="!end" class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                        <ChevronRightIcon *ngIf="!separatorTemplate" />
                        <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                    </li>
                </ng-template>
            </ul>
        </div>
    `, isInline: true, styles: [".p-breadcrumb{overflow-x:auto}.p-breadcrumb .p-breadcrumb-list{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none;display:flex;align-items:center}.p-breadcrumb .p-menuitem-separator{display:flex;align-items:center}.p-breadcrumb::-webkit-scrollbar{display:none}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.RouterLinkActive; }), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return HomeIcon; }), selector: "HomeIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Breadcrumb };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Breadcrumb, decorators: [{
            type: Component,
            args: [{ selector: 'p-breadcrumb', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ul [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
                <li [class]="home.styleClass" [ngClass]="{ 'p-breadcrumb-home': true, 'p-disabled': home.disabled }" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions" [attr.data-pc-section]="'home'">
                    <a
                        [href]="home.url ? home.url : null"
                        *ngIf="!home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        class="p-menuitem-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.id]="home.id"
                        [attr.tabindex]="home.disabled ? null : '0'"
                        [ariaCurrentWhenActive]="isCurrentUrl(home)"
                    >
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iprivateyle"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-menuitem-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{ home.label }}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="home.routerLink"
                        [routerLink]="home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        [queryParams]="home.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.id]="home.id"
                        [attr.tabindex]="home.disabled ? null : '0'"
                        [ariaCurrentWhenActive]="isCurrentUrl(home)"
                        [fragment]="home.fragment"
                        [queryParamsHandling]="home.queryParamsHandling"
                        [preserveFragment]="home.preserveFragment"
                        [skipLocationChange]="home.skipLocationChange"
                        [replaceUrl]="home.replaceUrl"
                        [state]="home.state"
                    >
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-menuitem-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-menuitem-text">{{ home.label }}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li *ngIf="model && home" class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                    <ChevronRightIcon *ngIf="!separatorTemplate" />
                    <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                </li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style" [ngClass]="{ 'p-disabled': item.disabled }" pTooltip [tooltipOptions]="item.tooltipOptions" [attr.data-pc-section]="'menuitem'">
                        <a
                            *ngIf="!item.routerLink"
                            [attr.href]="item.url ? item.url : null"
                            class="p-menuitem-link"
                            (click)="onClick($event, item)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [ariaCurrentWhenActive]="isCurrentUrl(item)"
                        >
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlLabel" class="p-menuitem-text">{{ item.label }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="item.routerLink"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            class="p-menuitem-link"
                            (click)="onClick($event, item)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                            [ariaCurrentWhenActive]="isCurrentUrl(item)"
                        >
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlRouteLabel" class="p-menuitem-text">{{ item.label }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                    </li>
                    <li *ngIf="!end" class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                        <ChevronRightIcon *ngIf="!separatorTemplate" />
                        <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                    </li>
                </ng-template>
            </ul>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-breadcrumb{overflow-x:auto}.p-breadcrumb .p-breadcrumb-list{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none;display:flex;align-items:center}.p-breadcrumb .p-menuitem-separator{display:flex;align-items:center}.p-breadcrumb::-webkit-scrollbar{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }]; }, propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], home: [{
                type: Input
            }], homeAriaLabel: [{
                type: Input
            }], onItemClick: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class BreadcrumbModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: BreadcrumbModule, declarations: [Breadcrumb], imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule], exports: [Breadcrumb, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BreadcrumbModule, imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule, RouterModule, TooltipModule, SharedModule] });
}
export { BreadcrumbModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: BreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
                    exports: [Breadcrumb, RouterModule, TooltipModule, SharedModule],
                    declarations: [Breadcrumb]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQTBCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hMLE9BQU8sRUFBVSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQVksYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUVoRDs7O0dBR0c7QUFDSCxNQXVIYSxVQUFVO0lBcUNDO0lBcENwQjs7O09BR0c7SUFDTSxLQUFLLENBQXlCO0lBQ3ZDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxJQUFJLENBQXVCO0lBQ3BDOzs7T0FHRztJQUNNLGFBQWEsQ0FBcUI7SUFDM0M7Ozs7T0FJRztJQUNPLFdBQVcsR0FBMkMsSUFBSSxZQUFZLEVBQTRCLENBQUM7SUFFN0UsU0FBUyxDQUF1QztJQUVoRixpQkFBaUIsQ0FBK0I7SUFFaEQsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRXRDLE9BQU8sQ0FBQyxLQUFpQixFQUFFLElBQWM7UUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQXVCO1FBQy9CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNwQixLQUFLLFdBQVc7b0JBQ1osSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3ZDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFJO1FBQ2IsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXBELE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQzt1R0FuRlEsVUFBVTsyRkFBVixVQUFVLGtSQWlDRixhQUFhLDZCQXRKcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E2R1QsOG9FQStGb0QsZ0JBQWdCLG9HQUFFLFFBQVE7O1NBdkZ0RSxVQUFVOzJGQUFWLFVBQVU7a0JBdkh0QixTQUFTOytCQUNJLGNBQWMsWUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZHVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7NkZBT1EsS0FBSztzQkFBYixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQU1JLFdBQVc7c0JBQXBCLE1BQU07Z0JBRXlCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUFxRGxDLE1BS2EsZ0JBQWdCO3VHQUFoQixnQkFBZ0I7d0dBQWhCLGdCQUFnQixpQkEzRmhCLFVBQVUsYUF1RlQsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFlBQVksYUF2RnBGLFVBQVUsRUF3RkcsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZO3dHQUd0RCxnQkFBZ0IsWUFKZixZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUN2RSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVk7O1NBR3RELGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQzlGLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDaEUsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nTW9kdWxlLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSwgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IEhvbWVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9ob21lJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkl0ZW1DbGlja0V2ZW50IH0gZnJvbSAnLi9icmVhZGNydW1iLmludGVyZmFjZSc7XG4vKipcbiAqIEJyZWFkY3J1bWIgcHJvdmlkZXMgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBhYm91dCBwYWdlIGhpZXJhcmNoeS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1icmVhZGNydW1iJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1icmVhZGNydW1iIHAtY29tcG9uZW50J1wiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYnJlYWRjcnVtYidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+XG4gICAgICAgICAgICA8dWwgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51J1wiIGNsYXNzPVwicC1icmVhZGNydW1iLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGkgW2NsYXNzXT1cImhvbWUuc3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsgJ3AtYnJlYWRjcnVtYi1ob21lJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBob21lLmRpc2FibGVkIH1cIiBbbmdTdHlsZV09XCJob21lLnN0eWxlXCIgKm5nSWY9XCJob21lXCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cImhvbWUudG9vbHRpcE9wdGlvbnNcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hvbWUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICBbaHJlZl09XCJob21lLnVybCA/IGhvbWUudXJsIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFob21lLnJvdXRlckxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJob21lQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudCwgaG9tZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJob21lLnRhcmdldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJob21lLnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImhvbWUuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaG9tZS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFDdXJyZW50V2hlbkFjdGl2ZV09XCJpc0N1cnJlbnRVcmwoaG9tZSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhvbWUuaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaG9tZS5pY29uXCIgW25nU3R5bGVdPVwiaG9tZS5pcHJpdmF0ZXlsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIb21lSWNvbiAqbmdJZj1cIiFob21lLmljb25cIiBbc3R5bGVDbGFzc109XCIncC1tZW51aXRlbS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaG9tZS5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaG9tZS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxIb21lTGFiZWxcIiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiPnt7IGhvbWUubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sSG9tZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJob21lLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJob21lLnJvdXRlckxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiaG9tZS5yb3V0ZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaG9tZUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiaG9tZS5xdWVyeVBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImhvbWUucm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGljaygkZXZlbnQsIGhvbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiaG9tZS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiaG9tZS50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJob21lLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImhvbWUuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthcmlhQ3VycmVudFdoZW5BY3RpdmVdPVwiaXNDdXJyZW50VXJsKGhvbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJob21lLmZyYWdtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImhvbWUucXVlcnlQYXJhbXNIYW5kbGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJlc2VydmVGcmFnbWVudF09XCJob21lLnByZXNlcnZlRnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJob21lLnNraXBMb2NhdGlvbkNoYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVwbGFjZVVybF09XCJob21lLnJlcGxhY2VVcmxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cImhvbWUuc3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhvbWUuaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaG9tZS5pY29uXCIgW25nU3R5bGVdPVwiaG9tZS5pY29uU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SG9tZUljb24gKm5nSWY9XCIhaG9tZS5pY29uXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtbWVudWl0ZW0taWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhvbWUubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhvbWUuZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sSG9tZVJvdXRlTGFiZWxcIiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiPnt7IGhvbWUubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sSG9tZVJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImhvbWUubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJtb2RlbCAmJiBob21lXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXNlcGFyYXRvclwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc2VwYXJhdG9yJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFzZXBhcmF0b3JUZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInNlcGFyYXRvclRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBsZXQtZW5kPVwibGFzdFwiIFtuZ0Zvck9mXT1cIm1vZGVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIH1cIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudWl0ZW0nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJpdGVtLnVybCA/IGl0ZW0udXJsIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXJpYUN1cnJlbnRXaGVuQWN0aXZlXT1cImlzQ3VycmVudFVybChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmljb25cIiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cIml0ZW0uaWNvblN0eWxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpdGVtLnJvdXRlckxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthcmlhQ3VycmVudFdoZW5BY3RpdmVdPVwiaXNDdXJyZW50VXJsKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgW25nU3R5bGVdPVwiaXRlbS5pY29uU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW0ubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWVuZFwiIGNsYXNzPVwicC1tZW51aXRlbS1zZXBhcmF0b3JcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NlcGFyYXRvcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uICpuZ0lmPVwiIXNlcGFyYXRvclRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInNlcGFyYXRvclRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51aXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWVudUl0ZW0gY29uZmlndXJhdGlvbiBmb3IgdGhlIGhvbWUgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBob21lOiBNZW51SXRlbSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBob21lIGljb24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaG9tZUFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gYW4gaXRlbSBpcyBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge0JyZWFkY3J1bWJJdGVtQ2xpY2tFdmVudH0gZXZlbnQgLSBjdXN0b20gY2xpY2sgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8QnJlYWRjcnVtYkl0ZW1DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnJlYWRjcnVtYkl0ZW1DbGlja0V2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIHNlcGFyYXRvclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLnVybCAmJiAhaXRlbS5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25JdGVtQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ib21lQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQgfCBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9tZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGV2ZW50LCB0aGlzLmhvbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcGFyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VwYXJhdG9yVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNDdXJyZW50VXJsKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgeyByb3V0ZXJMaW5rIH0gPSBpdGVtO1xuICAgICAgICBjb25zdCBsYXN0UGF0aCA9IHRoaXMucm91dGVyID8gdGhpcy5yb3V0ZXIudXJsIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIHJvdXRlckxpbmsgPT09IGxhc3RQYXRoID8gJ3BhZ2UnIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIENoZXZyb25SaWdodEljb24sIEhvbWVJY29uLCBTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCcmVhZGNydW1iLCBSb3V0ZXJNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQnJlYWRjcnVtYl1cbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYk1vZHVsZSB7fVxuIl19