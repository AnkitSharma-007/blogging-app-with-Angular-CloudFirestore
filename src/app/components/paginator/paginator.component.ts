import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent {
  @Input()
  pageSizeOptions: [];

  @Input()
  config: any;

  constructor(private readonly router: Router) {}

  pageChange(newPage: number) {
    this.router.navigate(["/page/", newPage]);
  }

  changePageItemCount(selectedItem) {
    sessionStorage.setItem("pageSize", selectedItem.value);
    this.config.itemsPerPage = selectedItem.value;
  }
}
