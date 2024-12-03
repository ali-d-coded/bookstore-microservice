import { BOOKS_PATTERNS } from '@app/contracts/books/books.pattern';
import { CreateBookDto as ClientCreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto as ClientUpadteBookDto} from '@app/contracts/books/update-book.dto';
import { BookDto as ClientBookDto} from '@app/contracts/books/book.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookDto } from './dto/book.dto';
import { map } from 'rxjs';
import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {

  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy){}

  private mapBookDto(bookDto:ClientBookDto):BookDto {
    return {
      id: bookDto.id,
      title:bookDto.title
    }
  }

  create(createBookDto: ClientCreateBookDto) {
    return this.booksClient.send<ClientBookDto,ClientCreateBookDto>(BOOKS_PATTERNS.CREATE,createBookDto).pipe(map(this.mapBookDto))
  }
  
  findAll() {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ALL,{})
  }
  
  findOne(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ONE,id)
  }
  
  update(id: number, updateBookDto: ClientUpadteBookDto) {
    
    return this.booksClient.send<ClientBookDto,ClientUpadteBookDto>(BOOKS_PATTERNS.UPDATE,{id, ...updateBookDto})
  }
  
  remove(id: number) {
    
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.REMOVE,id)
  }
}
