import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MeetingComponent } from "./pages/meeting/meeting.component";
import { AttendeeComponent} from "./pages/attendee/attendee.component";
import { AddMeetingComponent } from './pages/add-meeting/add-meeting.component';
import { MistralChatComponent } from './pages/mistral-chat/mistral-chat.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', component: DashboardComponent},
                    { path: 'meeting', component: MeetingComponent },
                    { path: 'attendee', component: AttendeeComponent },
                    { path: 'add-meeting', component: AddMeetingComponent },
                    { path: 'mistral', component: MistralChatComponent},
                ]   
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
