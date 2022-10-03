import { Injectable } from '@angular/core';

interface ShareObj {
    [id: string]: any;
}

@Injectable({
    providedIn: 'root'

})

export class GlobaldataService {
    public IsNewUser: boolean = false;
    public UserDetails: any;
    public Story: any;
    public SearchHistory: any = [];
    public Category: any;
}
