import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { Collection, blogs } from '../new/new.component';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
})
export class CollectionDetailComponent implements OnInit {
  public collectionId!: number;
  public collection!: Collection;
  public currentCardIndex: number = 0;
  public showAllCards: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['id'];
      this.getCollectionDetails(this.collectionId);
    });
  }

  getCollectionDetails(collectionId: number) {
    // Fetch the collection details from the service using the collection ID
    this.collectionService.getAllCollections().subscribe((collection) => {
      this.collection = collection.find((col) => col.id === collectionId)!;
      this.currentCardIndex = 0; // Reset the current card index to the first card
    });
  }
  flipCard(blogs: blogs) {
    blogs.showBack = !blogs.showBack;
  }

  prevCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  nextCard() {
    if (this.currentCardIndex < this.collection.blogs.length - 1) {
      this.currentCardIndex++;
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevCard();
    } else if (event.key === 'ArrowRight') {
      this.nextCard();
    } else if (event.key === ' ') {
      this.flipCard(this.collection.blogs[this.currentCardIndex]);
    }
  }
  toggleCardDisplay() {
    this.showAllCards = this.showAllCards ? false : true;
  }
}
