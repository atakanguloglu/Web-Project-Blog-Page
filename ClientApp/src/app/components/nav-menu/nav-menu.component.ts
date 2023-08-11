import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import 'bootstrap';
import 'jquery';
declare var $: JQueryStatic;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, AfterViewInit {
  isExpanded = false;
  isAuthenticated = this.auth.isLoggedIn();
  public role!: string;
  public email: string = '';
  public fullName: string = '';
  public users: any = [];
  private navMenuComponent!: NavMenuComponent;
  public query: string = '';
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    const component = this.navMenuComponent;
    $(document).ready(function () {
      // Initialize popover
      $('.user-icon').popover({
        html: true,
        content: function () {
          return $('#popover-content').html();
        },
        placement: 'bottom',
        container: 'body', // Specify 'body' as the container
      });

      // Handle click event on user icon
      $('.user-icon').on('click', function () {
        $(this).popover('toggle');
      });

      // Hide popover when clicking outside
      $(document).on('click', function (e) {
        if (
          !$(e.target).closest('.popover').length &&
          !$(e.target).closest('.user-icon').length
        ) {
          $('.user-icon').popover('hide');
        }
      });
      $(document).on('click', '#logout', function () {
        component.logout();
        $('.user-icon').popover('hide');
      });
    });
  }

  ngOnInit() {
    this.navMenuComponent = this;

    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.auth.signOut();
  }
  search() {
    // Redirect to /dashboard route with query parameter
    this.router.navigate(['/dashboard'], {
      queryParams: { query: this.query },
    });
  }
}
