import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardSecurityRoutingModule } from './dashboard-security-routing.module';
import { DashboardSecurityComponent }     from './dashboard-security.component';

// PrimeNG core modules
import { CardModule }       from 'primeng/card';
import { ChartModule }      from 'primeng/chart';
import { TableModule }      from 'primeng/table';
import { ToolbarModule }    from 'primeng/toolbar';
import { MenuModule }       from 'primeng/menu';
import { PanelMenuModule }  from 'primeng/panelmenu';
import { ButtonModule }     from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

// PrimeNG UI directives & extras
import { TooltipModule }       from 'primeng/tooltip';
import { DividerModule }       from 'primeng/divider';
import { SelectButtonModule }  from 'primeng/selectbutton';
import { ProgressBarModule }   from 'primeng/progressbar';
import { DropdownModule }      from 'primeng/dropdown';
import { TagModule }           from 'primeng/tag';
import { AccordionModule }     from 'primeng/accordion';
import { BadgeModule }         from 'primeng/badge';

@NgModule({
  declarations: [
    DashboardSecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardSecurityRoutingModule,

    // PrimeNG Core
    CardModule,
    ChartModule,
    TableModule,
    ToolbarModule,
    MenuModule,
    PanelMenuModule,
    ButtonModule,
    StyleClassModule,

    // PrimeNG Extras
    TooltipModule,
    DividerModule,
    SelectButtonModule,
    ProgressBarModule,
    DropdownModule,
    TagModule,
    AccordionModule,
    BadgeModule
  ]
})
export class DashboardSecurityModule { }
