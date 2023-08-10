import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
})
export class TranslateComponent implements OnInit {
  lang!: any;
  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  changeLang(event: Event): void {
    const selectedValue = (event.target as HTMLInputElement).value;
    localStorage.setItem('lang', selectedValue);
    window.location.reload();
    console.log(selectedValue);
  }
}
