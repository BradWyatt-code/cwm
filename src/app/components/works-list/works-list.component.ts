import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work.model';

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './works-list.component.html',
  styleUrl: './works-list.component.css'
})
export class WorksListComponent implements OnInit {
  works: Work[] = [];
  filteredWorks: Work[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedTag: string = 'all';
  availableTags: string[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private worksService: WorksService) {}

  ngOnInit() {
    this.worksService.works$.subscribe((works: Work[]) => {
      this.works = works;
      this.filteredWorks = works;
      this.availableTags = this.worksService.getAllTags();
    });
  }

  applyFilters() {
    this.filteredWorks = this.works.filter(work => {
      const matchesSearch = work.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           work.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType === 'all' || work.type === this.selectedType;
      const matchesTag = this.selectedTag === 'all' || work.tags.includes(this.selectedTag);
      
      return matchesSearch && matchesType && matchesTag;
    });
  }

  deleteWork(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this work?')) {
      this.worksService.deleteWork(id);
    }
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }
}
