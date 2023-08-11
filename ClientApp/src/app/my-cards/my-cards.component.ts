import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../new/new.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css'],
})
export class MyCardsComponent implements OnInit {
  public users: any = [];
  public coll!: Collection[];
  public results!: Collection[];
  public role!: string;

  public email: string = '';
  public fullName: string = '';
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userStore.getEmailFromStore().subscribe((val) => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    });
    this.collectionService.getUserCollections(this.email).subscribe((res) => {
      this.coll = res;
      console.log(this.email);
      console.log(res);
    });
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }
  delete(id: number) {
    this.collectionService.deleteCollection(id).subscribe((res) => {
      alert(res.message);
    });
  }
}
