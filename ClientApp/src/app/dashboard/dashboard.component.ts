import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../new/new.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public collections!: Collection[];
  public results!: Collection[];
  public role!: string;

  public email: string = '';
  public fullName: string = '';

  selectedCardIndex: number | null = null;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.collectionService.getAllCollections().subscribe((res) => {
      this.collections = res;
      this.results = res;
    });
    this.route.queryParams.subscribe((params) => {
      const query = params['query'];
      // Use the search parameter as needed
      this.results = this.collections?.filter((collection) =>
        collection.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    });
  }

  toggleCardSize(index: number) {
    this.selectedCardIndex = this.selectedCardIndex === index ? null : index;
  }
}
