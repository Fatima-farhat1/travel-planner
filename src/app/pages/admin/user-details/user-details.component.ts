import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService, AdminUserSummary } from '../../../services/user-store.service';
import { CityResult } from '../../../models/city.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  email = '';
  summary: AdminUserSummary | null = null;
  notFound = false;

  constructor(private route: ActivatedRoute, private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email') || '';
      this.load();
    });
  }

  load(): void {
    const users = this.userStore.getAllUsers();
    this.summary = users.find(u => u.email === this.email) || null;
    this.notFound = !this.summary;
  }

  removeFavorite(city: CityResult): void {
    if (!this.summary) {
      return;
    }
    this.userStore.removeFavoriteFor(this.summary.email, city);
    this.load();
  }
}