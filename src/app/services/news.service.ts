import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GlobaldataService } from "./globaldata.service";

@Injectable({ providedIn: 'root' })
export class newsService {
    constructor(private http: HttpClient, cookieService: CookieService) {
        cookieService.set("cookie", "NEWSAPP")
    }

    gettopnews(category: string = "world") {
        return this.http.post<any>(`${environment.apiUrl}/stories`, { category })
            .pipe(map(res => {
                if (res) {
                    return res;
                }
                return null;
            }));
    }
    searchnews(search: string, sort: string = 'newest') {
        return this.http.post<any>(`${environment.apiUrl}/search`, { search, sort })
            .pipe(map(res => {
                if (res) {
                    return res;
                }
                return null;
            }));
    }
    getcomments(newstype: string) {
        return this.http.get<any>(`${environment.apiUrl}/comments`)
            .pipe(map(res => {
                if (res) {
                    return res;
                }
                return null;
            }));
    }

}