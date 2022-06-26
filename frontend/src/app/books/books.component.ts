import { Component, OnInit } from '@angular/core';
import { BooksModel } from './books.model';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
 title:String="Books";
 books: BooksModel[] | any;
 imageWidth : number =50;
 imageMargin :number =2;
  book: any;

 constructor(public _auth: AuthService, public router: Router,public bookService:BookService )  { }

  ngOnInit(): void {

    this.bookService.getBooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data));
    })
    
  }

  
   editBook(book:any)
     {
   // alert(book._id);
    localStorage.setItem("editBookId", book._id.toString());
    localStorage.setItem("editBookId", book._id);
    this.router.navigate(['update']);

    }

  deleteBook(book:any)
  {
   
   this.bookService.deleteBook(book._id)
      .subscribe((data) => {
        this.books = this.books.filter((p: any) => p !== book);
      })
      
    }


}
