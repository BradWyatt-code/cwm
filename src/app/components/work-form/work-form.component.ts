import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work.model';

@Component({
  selector: 'app-work-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {
  workForm: FormGroup;
  isEditMode = false;
  workId: string | null = null;
  tags: string[] = [];
  newTag = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private worksService: WorksService
  ) {
    this.workForm = this.fb.group({
      title: ['', Validators.required],
      type: ['play', Validators.required],
      content: ['', Validators.required],
      excerpt: ['', Validators.required],
      status: ['draft', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    this.workId = this.route.snapshot.paramMap.get('id');
    
    if (this.workId) {
      this.isEditMode = true;
      const work = this.worksService.getWorkById(this.workId);
      
      if (work) {
        this.workForm.patchValue({
          title: work.title,
          type: work.type,
          content: work.content,
          excerpt: work.excerpt,
          status: work.status,
          notes: work.notes || ''
        });
        this.tags = [...work.tags];
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  addTag() {
    const tag = this.newTag.trim().toLowerCase();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onSubmit() {
    if (this.workForm.valid) {
      const formValue = this.workForm.value;
      
      if (this.isEditMode && this.workId) {
        this.worksService.updateWork(this.workId, {
          ...formValue,
          tags: this.tags
        });
      } else {
        this.worksService.addWork({
          ...formValue,
          tags: this.tags
        });
      }
      
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
