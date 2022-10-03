import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { helper } from 'src/app/helper/helper';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';
import { newsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterFrom!: FormGroup;
  submitted = false;
  returnUrl!: string;

  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private authenticationService: AuthenticationService, private shservice: newsService,
    private router: Router, public dataService: GlobaldataService, public DataHelper: helper, private _loader: LoaderService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  responseModel: ResponseModel = new ResponseModel();

  ngOnInit(): void {
    this.responseModel.Status = false;
    this.dataService.IsNewUser = true;
    this.RegisterFrom = this._fb.group({
      UserID: this._fb.control(null,
        [Validators.required,
        Validators.maxLength(7),
        Validators.minLength(4)]),
      Password: this._fb.control(null,
        [Validators.required]),
      FirstName: this._fb.control(null,
        [Validators.required]),
      LastName: this._fb.control(null,
        [Validators.required])
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
  }

  get f() { return this.RegisterFrom.controls; }

  Register() {
    if (this.RegisterFrom.invalid) {
      return;
    }
    this._loader.show();
    this.authenticationService.register(this.f['UserID'].value, this.f['Password'].value, this.f['FirstName'].value, this.f['LastName'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate([this.DataHelper.PageRouting.home]);
          } else {
            this.responseModel.Message = "Failed to register";
          }
        },
        error: (ex) => {
          this.responseModel.Message = ex;
        }
      })
  }
}
