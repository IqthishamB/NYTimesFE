import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { helper } from 'src/app/helper/helper';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';
import { StoryDetails } from 'src/app/models/StoryDetails';
import { UserDetails } from 'src/app/models/UserDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginFrom!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private authenticationService: AuthenticationService,
    private router: Router, public dataService: GlobaldataService, public DataHelper: helper) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  responseModel: ResponseModel = new ResponseModel();

  ngOnInit(): void {
    this.responseModel.Status = false;
    this.dataService.IsNewUser = false;

    this.LoginFrom = this._fb.group({
      UserID: this._fb.control(null,
        [Validators.required,
        Validators.maxLength(7),
        Validators.minLength(4)]),
      Password: this._fb.control(null,
        [Validators.required])
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    this.dataService.SearchHistory = [];
    this.dataService.UserDetails = new UserDetails();
    this.dataService.IsNewUser = false;
    this.dataService.Story = new StoryDetails();
  }

  get f() { return this.LoginFrom.controls; }

  signin() {
    if (this.LoginFrom.invalid) {
      return;
    }

    this.authenticationService.login(this.f['UserID'].value, this.f['Password'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate([this.DataHelper.PageRouting.home]);
          } else {
            this.responseModel.Message = "Username or password is incorrect";
          }
        },
        error: (ex) => {
          this.responseModel.Message = ex;
        }
      });
  }
}
