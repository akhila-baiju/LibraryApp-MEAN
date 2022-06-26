import { Component, OnInit } from '@angular/core';
import { BooksModel } from '../books/books.model';
//import { BooksService } from '../book.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  title:String ="Add Book";
  BookItem:any =new BooksModel("","","","");
  constructor(public bookService:BookService,public route: Router) { 
  }
  ngOnInit(): void {
  }
  newBook(){
    this.bookService.addBooks(this.BookItem);
    console.log("called");
    alert("new Book added");
    this.route.navigate(['books']);
  }
}
