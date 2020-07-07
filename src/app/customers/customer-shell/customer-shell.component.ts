import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pm-customer-shell',
  templateUrl: './customer-shell.component.html',
  styleUrls: ['./customer-shell.component.css'],
})
export class CustomerShellComponent implements OnInit {
  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {}

  onAddCustomer() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
