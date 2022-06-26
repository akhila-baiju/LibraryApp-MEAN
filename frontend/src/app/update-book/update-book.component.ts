import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BooksModel } from '../books/books.model';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  title:String ="Add Book";
  BookItem:any =new BooksModel("","","","");
  
  constructor(public bookService:BookService, public router:Router) { }

  ngOnInit(): void {
    let bookId =localStorage.getItem("editBookId");
    this.bookService.getBook(bookId).subscribe((data)=>{
      this.BookItem=JSON.parse(JSON.stringify(data));
  }) 

  }

  editBook()
  {    
    this.bookService.editBook(this.BookItem);   
    alert("Success");
    this.router.navigate(['books']);
  }

}
