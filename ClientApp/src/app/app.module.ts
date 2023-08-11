import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CardComponent } from './components/home/card/card.component';
import { UserCommentComponent } from './components/home/user-comment/user-comment.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardItemComponent } from './components/home/card-item/card-item.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserStoreService } from './services/user-store.service';
import { NewComponent } from './new/new.component';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserCommentComponent,
    FooterComponent,
    CardItemComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    NewComponent,
    MyCardsComponent,
    CollectionDetailComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new', component: NewComponent },
      { path: 'my-cards', component: MyCardsComponent },
      { path: 'collection/:id', component: CollectionDetailComponent },
    ]),
  ],
  providers: [UserStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
