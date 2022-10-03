import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { helper } from 'src/app/helper/helper';
import { first } from 'rxjs/operators';
import { GlobaldataService } from 'src/app/services/globaldata.service';
import { newsService } from 'src/app/services/news.service';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  commets: any = [];
  responseModel: ResponseModel = new ResponseModel();

  constructor(private router: Router, public dataService: GlobaldataService,
    private Services: newsService, public DataHelper: helper) {
  }

  ngOnInit(): void {
    if (this.dataService.Story) {
      this.getcomments();
    }
  }

  getcomments() {
    this.Services.getcomments(this.dataService.Story.web_url)
      .pipe(first())
      .subscribe({
        next: (res) => {
          var result = JSON.parse(res);
          if (result.status = "OK" && !result.fault) {
            this.commets = result.data;
          }
          else {
            this.responseModel.Message = 'Failed to get the comments, Please try again';
          }
        },
        error: (ex) => {
          this.responseModel.Message = ex;
        }
      });
  }
}
