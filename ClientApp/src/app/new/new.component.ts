import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { HttpClient } from '@angular/common/http';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
export interface blogs {
  index: number;
  front: string;

  showBack?: boolean;
}

export interface Collection {
  id?: number;
  name: string;
  blogs: blogs[];
  userEmail?: string;
}
const collectionInitialData = {
  name: '',
  blogs: [],
};

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  @Output() createCollection: EventEmitter<any> = new EventEmitter();
  collectionName: string = '';
  blogs: blogs[] = [];
  editingblogs!: blogs | null; // Declare editingblogs property
  originalblogs!: blogs | null;
  collectionData: Collection = collectionInitialData;
  fullName!: string;
  email!: string;
  constructor(
    private router: Router,
    private collection: CollectionService,
    private http: HttpClient,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      const emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    });
  }

  addblogs(front: string): void {
    const blogs: blogs = {
      index: this.blogs.length + 1,
      front,

    };
    this.blogs.push(blogs);
  }

  deleteblogs(index: number): void {
    this.blogs = this.blogs.filter(
      (blogs) => blogs.index !== index
    );
  }

  editblogs(index: number): void {
    this.editingblogs = this.blogs.find(
      (blogs) => blogs.index === index
    )!; // Set the editingblogs property
    this.originalblogs = { ...this.editingblogs }; // Create a copy of the original blogs
  }

  updateblogs(index: number, front: string): void {
    const blogs = this.blogs.find(
      (blogs) => blogs.index === index
    );
    if (blogs) {
      blogs.front = front;

    }
    this.editingblogs = null; // Reset the editingblogs property
  }

  cancelEdit() {
    if (this.editingblogs) {
      // Restore the original blogs values
      Object.assign(this.editingblogs, this.originalblogs);
      this.editingblogs = null;
      this.originalblogs = null;
    }
  }

  // Define a method to handle the form submission
  onSubmit() {
    this.collectionData.name = this.collectionName;
    this.collectionData.blogs = this.blogs;
    this.collectionData.userEmail = this.email;
    console.log(this.collectionData);
    // Emit the createCollection event with the new collection data
    this.collection.createCollection(this.collectionData).subscribe({
      next: (res) => {
        console.log(res.message);
        this.collectionData = collectionInitialData;
        this.router.navigate(['/dashboard']);
        alert(res.message);
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }
}
