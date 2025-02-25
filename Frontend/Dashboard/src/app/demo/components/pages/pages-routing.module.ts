import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'crudincidents', loadChildren: () => import('./incident-crud/incident-crud.module').then(m => m.IncidentCrudModule) },
        { path: 'crudinspection', loadChildren: () => import('./inspection-crud/inspection-crud.module').then(m => m.InspectionCrudModule) },
        { path: 'crudemergency', loadChildren: () => import('./emergency-crud/emergency-crud.module').then(m => m.EmergencyCrudModule) },
        { path: 'crudchecklist', loadChildren: () => import('./checklist-crud/checklist-crud.module').then(m => m.ChecklistCrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
