import { BookDto } from '@app/contracts/books/book.dto';
import { CreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto } from '@app/contracts/books/update-book.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id:1,
      title:"Title 1",
      author:"Author 1",
      rating:3.9,
    },
    {
      id:2,
      title:"Title 2",
      author:"Author 2",
      rating:3.9,
    },
  ]
  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1
    }

    this.books.push(newBook)
    return newBook
  }

  findAll() {
    return this.books
  }

  findOne(id: number) {
    return this.books.find(it => it.id === id)
  }

  update(id: number, updateBookDto: UpdateBookDto) {

    console.log({id, updateBookDto});
    

    const index = this.books.findIndex(book => book.id === id);
  if (index !== -1) {
    this.books[index] = { ...this.books[index], ...updateBookDto };

    return this.books[index]
  } else {
    console.log(`Book with id ${id} not found.`);
    return `Book with id ${id} not found.`
  }
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
