import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed: boolean = false;
  isMobilePortrait: boolean = false;

  ngOnInit(): void {
    this.calcWidth();
  }


  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.calcWidth();
  }

  private calcWidth() {
    this.isMobilePortrait = window.innerWidth < 684;
  }
}
