import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Work } from '../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  private readonly STORAGE_KEY = 'creative-works';
  private worksSubject = new BehaviorSubject<Work[]>([]);
  public works$ = this.worksSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.worksSubject.next(this.loadWorks());
      if (this.getWorks().length === 0) {
        this.initializeSampleData();
      }
    }
  }

  private loadWorks(): Work[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const works = JSON.parse(stored);
      return works.map((work: any) => ({
        ...work,
        dateCreated: new Date(work.dateCreated),
        lastModified: new Date(work.lastModified)
      }));
    }
    return [];
  }

  private saveWorks(works: Work[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(works));
    }
    this.worksSubject.next(works);
  }

  getWorks(): Work[] {
    return this.worksSubject.value;
  }

  getWorkById(id: string): Work | undefined {
    return this.getWorks().find(work => work.id === id);
  }

  addWork(work: Omit<Work, 'id' | 'dateCreated' | 'lastModified'>): Work {
    const newWork: Work = {
      ...work,
      id: this.generateId(),
      dateCreated: new Date(),
      lastModified: new Date()
    };
    const works = [...this.getWorks(), newWork];
    this.saveWorks(works);
    return newWork;
  }

  updateWork(id: string, updates: Partial<Work>): void {
    const works = this.getWorks().map(work =>
      work.id === id ? { ...work, ...updates, lastModified: new Date() } : work
    );
    this.saveWorks(works);
  }

  deleteWork(id: string): void {
    const works = this.getWorks().filter(work => work.id !== id);
    this.saveWorks(works);
  }

  getAllTags(): string[] {
    const tagSet = new Set<string>();
    this.getWorks().forEach(work => {
      work.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initializeSampleData(): void {
    const sampleWorks: Omit<Work, 'id' | 'dateCreated' | 'lastModified'>[] = [
      {
        title: 'Echoes of Tomorrow',
        type: 'play',
        content: 'ACT I, SCENE 1\n\n[A dimly lit room. SARAH stands by the window.]\n\nSARAH: The future is a mirror, reflecting what we dare not see...',
        excerpt: 'A drama about time, choices, and the echoes they leave behind.',
        tags: ['drama', 'sci-fi', 'philosophical'],
        status: 'published'
      },
      {
        title: 'Whispers in the Wind',
        type: 'poem',
        content: 'Silent voices call my name\nThrough corridors of time and flame\nWhat once was lost may yet be found\nWhere whispers dance on hallowed ground',
        excerpt: 'A meditation on memory and loss.',
        tags: ['lyric', 'contemplative'],
        status: 'published'
      },
      {
        title: 'The Last Station',
        type: 'prose',
        content: 'The train pulled into the station just as the sun dipped below the horizon. Marcus had been waiting for this moment for twenty years...',
        excerpt: 'A short story about redemption and second chances.',
        tags: ['short-story', 'literary-fiction'],
        status: 'draft'
      }
    ];
    sampleWorks.forEach(work => this.addWork(work));
  }
}
