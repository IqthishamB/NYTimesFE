import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { helper } from 'src/app/helper/helper';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { GlobaldataService } from 'src/app/services/globaldata.service';
import { newsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  constructor(private router: Router, public dataService: GlobaldataService,
    private Services: newsService, public DataHelper: helper) {

  }

  stories: any; searchstories: any;
  public searchtext: string = '';
  responseModel: ResponseModel = new ResponseModel();

  ngOnInit(): void {
    if (this.dataService.Category) {
      this.GetTopStories(this.dataService.Category);
    } else {
      this.GetTopStories("world");
      this.GetTopStories("science");
    }
  }


  GetTopStories(category: any) {
    this.Services.gettopnews(category)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            var result = JSON.parse(res);
            if (result.status = "OK") {
              if (this.stories)
                this.stories.push(result.results);
              else
                this.stories = result.results;
            }
            else {
              this.responseModel.Message = 'Failed to fetch the details, Please try again';
            }
          }
        },
        error: (ex) => {
          this.responseModel.Message = ex;
        }
      });
  }
  SearchHistory(histroy: string) {
    this.searchtext = histroy;
    this.Search();
  }
  Search() {
    this.texthistory();
    this.Services.searchnews(this.searchtext)
      .pipe(first())
      .subscribe({
        next: (res) => {
          var result = JSON.parse(res);
          if (result.status = "OK") {
            this.stories = null; this.searchstories = null;
            this.searchstories = result.response.docs;
            console.log(result.response.docs);
          }
          else {
            this.responseModel.Message = 'Failed to fetch the details, Please try again';
          }
        },
        error: (ex) => {
          this.responseModel.Message = ex;
        }
      });
  }

  texthistory() {
    if (this.dataService.SearchHistory.length == 0) {
      this.dataService.SearchHistory.push(this.searchtext);
    }
    else {
      if (this.dataService.SearchHistory.length < 5) {
        let value = this.dataService.SearchHistory.filter((v: any) => v === this.searchtext);
        if (value.length == 0) {
          this.dataService.SearchHistory.push(this.searchtext);
        }
      }
      else {
        let value = this.dataService.SearchHistory.filter((v: any) => v === this.searchtext);
        if (value.length == 0) {
          this.dataService.SearchHistory.forEach((element: any, index: any) => {
            if (element !== this.searchtext) {
              if (index == 0) { this.dataService.SearchHistory.splice(index, 1); }
            }
          });
          this.dataService.SearchHistory.push(this.searchtext);
        }
      }
    }
  }
  story(category: string) {
    this.stories = null;
    this.searchstories = null;
    this.GetTopStories(category);
  }
  readmore(story: any) {
    this.dataService.Story.img_url = story.multimedia != null && story.multimedia[0].url;
    this.dataService.Story.title = story.title;
    this.dataService.Story.byline = story.byline;
    this.dataService.Story.date = story.published_date;
    this.dataService.Story.abstract = story.abstract;
    this.dataService.Story.lead_paragraph = story.lead_paragraph;
    this.dataService.Story.web_url = story.url;
    this.dataService.Story.source = story.short_url;
    this.router.navigate([this.DataHelper.PageRouting.Stories]);
  }
  sreadmore(story: any) {
    this.dataService.Story.img_url = story.web_url.split('/')[0] + story.web_url.split('/')[1] + story.web_url.split('/')[2] + '/' + story.multimedia[0].url;
    this.dataService.Story.title = story.headline.main;
    this.dataService.Story.byline = story.section_name;
    this.dataService.Story.date = story.pub_date;
    this.dataService.Story.abstract = story.abstract;
    this.dataService.Story.lead_paragraph = story.lead_paragraph;
    this.dataService.Story.web_url = story.web_url;
    this.dataService.Story.source = story.source;
    this.router.navigate([this.DataHelper.PageRouting.Stories]);
  }
}
