import { Component, OnInit } from '@angular/core';
import { AdminUserSummary } from 'src/app/services/store.service.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users:AdminUserSummary[]=[];


  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.refresh();
  }
  refresh(): void {
    this.users = this.userStore.getAllUsers();
  }
   removeUser(email:string):void{
    const confirmed = confirm('Remove this user and all their saved favorites? This can\'t be undone.');
    if (!confirmed) {
      return;
    }
    this.userStore.removeUser(email);
    this.refresh();
  }
   

}
