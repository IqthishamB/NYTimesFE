import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { helper } from './helper/helper';
import { UserDetails } from './models/UserDetails';
import { AuthenticationService } from './services/authentication.service';
import { GlobaldataService } from './services/globaldata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser !: UserDetails;
  title = 'newsapp';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, public DataHelper: helper,
    public dataService: GlobaldataService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['./']);
  }
  Register() {
    this.dataService.IsNewUser = true;
    this.router.navigate([this.DataHelper.PageRouting.Register]);
  }
  Login() {
    this.dataService.IsNewUser = false;
    this.router.navigate([this.DataHelper.PageRouting.Login]);
  }

  story(category: string) {
    this.dataService.Category = category;
    this.router.navigate([this.DataHelper.PageRouting.home]);
  }
}
