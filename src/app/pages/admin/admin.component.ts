import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  totalUsers = 0;
  totalFavorites = 0;
  totalAdmins = 0;

  constructor(private userStore: UserStoreService) {}

  ngOnInit(): void {
    const users = this.userStore.getAllUsers();
    this.totalUsers = users.length;
    this.totalFavorites = users.reduce((sum, u) => sum + u.favorites.length, 0);
    this.totalAdmins = users.filter(u => u.role === 'admin').length;
  }
}