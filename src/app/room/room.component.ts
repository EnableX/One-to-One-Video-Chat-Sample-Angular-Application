import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
declare var joinRoomlocal: any;

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    var tokenData = this.route.snapshot.queryParams;
    this.apiService.getAuthToken({ tokenData }).subscribe((data: any[]) => {
      console.log(data, 'tokendata');
      joinRoomlocal(data);
    });
  }

  // ngOnDestroy() {
  //   endCall();
  // }
}
