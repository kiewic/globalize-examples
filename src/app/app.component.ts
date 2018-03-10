import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedSection: number = 0;

  ngOnInit() {
  }

  onChange(event) {
    this.selectedSection = Number(event.target.value);
  }

  demoFun(): void {
    console.log("Hello!");
  }
}
