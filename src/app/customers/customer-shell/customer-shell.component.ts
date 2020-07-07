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

  onAddCustomer(isReactive: boolean = false) {
    let routeUrl = 'edit';
    if (isReactive) {
      routeUrl = 'reactiveEdit';
    }
    this.router.navigate([routeUrl], { relativeTo: this.route });
  }
}
