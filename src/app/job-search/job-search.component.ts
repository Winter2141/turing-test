import { Component, OnInit } from '@angular/core';
import { Category, Job } from '../structure';
import { jobs } from '../jobs';
import { JobService } from '../job.service';
import { faBuilding, faCalendarCheck  } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase, faPeopleGroup, faLocationDot, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  faBuilding = faBuilding;
  faBriefcase = faBriefcase;
  faPeopleGroup = faPeopleGroup;
  faLocationDot = faLocationDot;
  faDollarSign = faDollarSign;
  faCalendarCheck = faCalendarCheck;
  constructor(private jobService: JobService){}

  filters: Category[] = [
    {
      id: 2031,
      name: 'React'
    },
    {
      id: 433,
      name: 'AWS'
    },
    {
      id: 20,
      name: 'Python'
    },
    {
      id: 120,
      name: 'Node.js'
    },
    {
      id: 158,
      name: 'Typescript'
    },
    {
      id: 93,
      name: 'Javascript'
    },
    {
      id: 114,
      name: 'SQL'
    },
    {
      id: 107,
      name: 'CSS'
    },
    {
      id: 29,
      name: 'Java'
    },
    {
      id: 387,
      name: 'HTML'
    },
    {
      id: 55,
      name: 'Docker'
    },
    {
      id: 61,
      name: 'Kubernetes'
    },
    {
      id: 86,
      name: 'PostgreSQL'
    },
    {
      id: 160,
      name: 'React Native'
    },
    {
      id: 159,
      name: 'GraphQL'
    },
    {
      id: 116,
      name: 'MongoDB'
    },
    {
      id: 165,
      name: 'PHP'
    },
    {
      id: 26,
      name: 'Go/Golang'
    },
    {
      id: 30,
      name: 'Ruby on Rails'
    },
    {
      id: 2036,
      name: 'Angular'
    },
    {
      id: 54,
      name: 'Devops'
    }
  ];

  selectedFilters: number[] = [];

  jobList: Job[] = jobs;

  ngOnInit(): void {
    this.getJobs();
  }

  currentJob: Job = jobs[0];

  setFilter(evt: MouseEvent, filter: Category): void {
    const target = evt.target as Element;
    const currentIndex = this.selectedFilters.findIndex(item => item === filter.id);
    if (currentIndex !== -1) {
      target.classList.remove('active');
      this.selectedFilters.splice(currentIndex, 1);
    } else {
      target.classList.add('active');
      this.selectedFilters.push(filter.id);
    }
    this.getJobs();
  }

  getJobs(): void {
    const params = {
      skillIds: this.selectedFilters.join(','),
      limit: 30,
      locale: 'en'
    }
    if(this.selectedFilters.length === 0) {
      this.jobList = jobs;
      this.currentJob = jobs[0];
    } else {
      const filteredJobs = jobs.filter((job: Job) => {
        if(job.requiredSkills.length === 0) {
          return false;
        }
        const requireIndex = job.requiredSkills.findIndex(skill => this.selectedFilters.includes(skill.id))
        if(requireIndex !== -1) {
          return true;
        }
        if(job.optionalSkills.length === 0) {
          return false;
        }
        const optionIndex = job.optionalSkills.findIndex(skill => this.selectedFilters.includes(skill.id))
        if(optionIndex !== -1) {
          return true;
        }
        return false;
      });
      this.jobList = filteredJobs;
      if(filteredJobs.length) {
        this.currentJob = filteredJobs[0];
      }
    }
    if(this.jobList.length > 30) {
      this.jobList = this.jobList.slice(30, this.jobList.length-1);
    }
    //this.jobService.getJobs(params).subscribe(jobs => this.jobList = jobs);
    //console.log(this.jobList);
  }

  selectJob(evt: MouseEvent, job: Job): void {
    this.currentJob = job;
    const target = evt.target as Element;
    const list_element = document.querySelectorAll('.job-list-box ul li');
    list_element.forEach(item => {
      item.classList.remove('active')
    })
    const parent = target.closest('.job-list-item');
    if(parent && !parent.classList.contains('active')) {
      parent.classList.add('active');
    }
  }

  showTimeSpacing(createTime: string, prefix: string = ''): string {
    const createDate = new Date(createTime);
    const currentDate = new Date();
    const msInHour = 1000 * 60 * 60;
    const diffHours = Math.round(Math.abs(currentDate.getTime() - createDate.getTime())/msInHour);
    if(diffHours < 1) {
      const diffMins = currentDate.getMinutes() - createDate.getMinutes();
      if(diffMins < 1) {
        return `${prefix}1 min ago`
      }
      return `${prefix}${diffMins} mins ago`;
    }
    if(diffHours < 24) {
      return `${prefix}${diffHours} ${diffHours === 1 ? 'hr' : 'hrs'} ago`;
    }
    const diffDay = Math.floor(diffHours / 24);
    if(diffDay < 30) {
      return `${prefix}${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
    }
    return '';
  }

  showComponaySize(size: number): string {
    if(size < 11) {
      return '1-10';
    }
    if(size < 51) {
      return '11-50';
    }
    if(size < 251) {
      return '51-250';
    }
    if(size < 10000) {
      return '251-10K';
    }
    return '10K++';
  }
}
