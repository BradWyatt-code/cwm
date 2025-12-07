import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work.model';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {
  work: Work | undefined;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private worksService: WorksService,
  private location: Location
) {}


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.work = this.worksService.getWorkById(id);
      if (!this.work) {
        this.router.navigate(['/']);
      }
    }
  }

  deleteWork() {
    if (this.work && confirm('Are you sure you want to delete this work?')) {
      this.worksService.deleteWork(this.work.id);
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
