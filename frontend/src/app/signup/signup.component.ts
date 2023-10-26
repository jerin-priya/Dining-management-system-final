import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;
  departmentOptions = ['Architecture', 'Chemical Engineering & Polymer Science', 'Civil & Environmental Engineering', 'Computer Science & Engineering',
  'Electrical & Electronic Engineering','Software Engineering',
  'Mechanical Engineering','Industrial & Production Engineering','Petroleum and Mining Engineering'];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      registrationNo: [null, [Validators.required, Validators.minLength(7)]],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
        
      ],
      Department: [null, [Validators.required, Validators.minLength(7)]],

      password: [null, [Validators.required, Validators.minLength(7)]],
    });
  }

  handleSubmit() {
    this.ngxService.start();
    let formData = this.signupForm.value;
    var data = {
      name: formData.name,
      registrationNo:formData.registrationNo,
      email: formData.email,
      phone: formData.contactNumber,
      department:formData.department,
      password: formData.password,
    };

    this.userService.signup(data).subscribe(
      (resp: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = resp?.message;
        this.snackBar.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/']);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
