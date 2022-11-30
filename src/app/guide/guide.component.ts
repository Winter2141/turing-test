import { Component } from '@angular/core';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { Card } from '../structure';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  faCirclePlay = faCirclePlay;

  cardData: Card[] = [
    {
      id: 1,
      image: 'https://www.turing.com/img/promo-card-img01.svg',
      title: 'Elite US jobs',
      content: 'Turing’s developers earn better than market pay in most countries, working with top US companies.'
    },
    {
      id: 2,
      image: 'https://www.turing.com/img/promo-card-img02.svg',
      title: 'Career Growth',
      content: 'Grow rapidly by working on challenging technical and business problems on the latest technologies.'
    },
    {
      id: 3,
      image: 'https://www.turing.com/img/promo-card-img03.svg',
      title: 'Developer success support',
      content: 'While matched, enjoy 24/7 developer success support.'
    }
  ]
}
