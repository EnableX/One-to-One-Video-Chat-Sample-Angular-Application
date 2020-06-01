import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showRoomIDMessage = false;
  roomData = null;
  loginFormData = { roomName: '' };
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nameText: ['', Validators.required],
      roomName: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
    this.loginForm.value.nameText = 'Shivam';
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.apiService
      .getRoomData({ roomId: this.loginFormData.roomName })
      .subscribe((data: any[]) => {
        this.roomData = data;
        console.log(data, 'roomData');
        this.router.navigate(['/room'], {
          queryParams: {
            roomId: this.loginFormData.roomName,
            name: this.roomData.room.name,
            role: 'participant',
            user_ref: this.loginForm.value.nameText,
          },
        });
      });
  }

  onClickCreateRoom() {
    this.apiService.createRoom().subscribe((data: any[]) => {
      this.roomData = data;
      this.loginFormData.roomName = this.roomData.room.room_id;
      this.showRoomIDMessage = true;
    });
  }
}
