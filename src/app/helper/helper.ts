import { Injectable } from '@angular/core';

@Injectable()

export class helper {

  public PageRouting: any = {
    Login: '',
    home: '/home',
    Register:'/register',
    Stories:'/stories'
  }
}
